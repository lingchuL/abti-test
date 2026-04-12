'use client';

import { useState } from 'react';
import { OUTCOMES, byCode } from '@/data/outcomes';
import { GalleryCard } from './GalleryCard';
import { PersonalityModal } from './PersonalityModal';
import { useLang } from '@/i18n';

interface Props {
  initialModalCode?: string;
}

export function GalleryGrid({ initialModalCode }: Props) {
  const { t } = useLang();
  const [modalCode, setModalCode] = useState<string | null>(initialModalCode || null);

  const normal = OUTCOMES.filter(o => !o.isSpecial);
  const special = OUTCOMES.filter(o => o.isSpecial);

  return (
    <>
      <h2 className="mb-3 px-1 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
        <span className="w-1 h-4 bg-orange-500 rounded" />
        {t.standardPersonalities}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {normal.map(o => (
          <GalleryCard key={o.code} outcome={o} onClick={() => setModalCode(o.code)} />
        ))}
      </div>

      <h2 className="mt-8 mb-3 px-1 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
        <span className="w-1 h-4 bg-amber-500 rounded" />
        {t.specialPersonalities}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {special.map(o => (
          <GalleryCard key={o.code} outcome={o} onClick={() => setModalCode(o.code)} />
        ))}
      </div>

      <PersonalityModal
        outcome={modalCode ? byCode[modalCode] || null : null}
        onClose={() => setModalCode(null)}
      />
    </>
  );
}

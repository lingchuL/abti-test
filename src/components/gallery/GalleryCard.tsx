'use client';

import type { Outcome } from '@/data/outcomes';
import { useLang } from '@/i18n';

interface Props {
  outcome: Outcome;
  onClick: () => void;
}

export function GalleryCard({ outcome: o, onClick }: Props) {
  const { t, oc } = useLang();
  const text = oc(o.code);
  const tier = rarityTier(o.rarity.percent, t);

  return (
    <button
      onClick={onClick}
      className="card relative text-left rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md"
    >
      {o.isSpecial && (
        <span className={`absolute top-1.5 left-1.5 text-[10px] ${o.code === 'POOP' ? 'bg-amber-500' : 'bg-green-500'} text-white px-1.5 py-0.5 rounded-full font-medium z-10`}>
          {o.code === 'POOP' ? t.specialFallback : t.specialHidden}
        </span>
      )}
      <span className={`absolute top-1.5 right-1.5 text-[10px] ${tier.cls} text-white px-1.5 py-0.5 rounded-full font-bold z-10`}>
        {o.rarity.percent}%
      </span>
      <div className="emoji-avatar" style={{ background: `${o.color}15` }}>
        <span>{o.emoji}</span>
      </div>
      <div className="p-2.5 sm:p-3">
        <div className="flex items-baseline gap-1.5">
          <span className="font-bold text-sm">{o.code}</span>
          <span className="text-xs text-slate-500">{text.cn}</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-snug">{text.oneLiner}</p>
      </div>
    </button>
  );
}

export function rarityTier(pct: number, t: { rarityCommon: string; rarityMedium: string; rarityRare: string; rarityUltraRare: string }) {
  if (pct >= 5) return { cls: 'bg-slate-400/90', label: t.rarityCommon };
  if (pct >= 2) return { cls: 'bg-blue-500/90', label: t.rarityMedium };
  if (pct >= 1) return { cls: 'bg-purple-500/90', label: t.rarityRare };
  return { cls: 'bg-amber-500/90', label: t.rarityUltraRare };
}

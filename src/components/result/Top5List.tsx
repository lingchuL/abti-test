'use client';

import type { ScoredOutcome } from '@/lib/scoring';
import { useLang } from '@/i18n';

interface Props {
  top5: ScoredOutcome[];
}

export function Top5List({ top5 }: Props) {
  const { oc } = useLang();

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {top5.map((t, i) => {
        const text = oc(t.code);
        return (
          <div key={t.code} className={`flex items-center gap-3 py-2 ${i === 0 ? 'font-bold' : ''}`}>
            <span className="shrink-0 w-6 text-center text-xs text-slate-400">#{i + 1}</span>
            <span className="text-lg">{t.emoji}</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium">{t.code}</span>
              <span className="text-xs text-slate-500 ml-1">{text.cn}</span>
            </div>
            <span className="text-xs font-mono text-orange-500">{t.similarity}%</span>
          </div>
        );
      })}
    </div>
  );
}

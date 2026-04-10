import type { Outcome } from '@/data/outcomes';

function rarityTier(pct: number) {
  if (pct >= 5) return { cls: 'bg-slate-400/90', label: '常见' };
  if (pct >= 2) return { cls: 'bg-blue-500/90', label: '中等' };
  if (pct >= 1) return { cls: 'bg-purple-500/90', label: '稀有' };
  return { cls: 'bg-amber-500/90', label: '极稀有' };
}

interface Props {
  outcome: Outcome;
  onClick: () => void;
}

export function GalleryCard({ outcome: o, onClick }: Props) {
  const tier = rarityTier(o.rarity.percent);

  return (
    <button
      onClick={onClick}
      className="card relative text-left rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md"
    >
      {o.isSpecial && (
        <span className={`absolute top-1.5 left-1.5 text-[10px] ${o.code === 'POOP' ? 'bg-amber-500' : 'bg-green-500'} text-white px-1.5 py-0.5 rounded-full font-medium z-10`}>
          {o.code === 'POOP' ? '兜底' : '隐藏'}
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
          <span className="text-xs text-slate-500">{o.cn}</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-snug">{o.oneLiner}</p>
      </div>
    </button>
  );
}

export { rarityTier };

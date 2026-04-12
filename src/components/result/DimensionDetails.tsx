'use client';

import { DIMENSION_ORDER, type DimensionKey, type Level } from '@/data/dimensions';
import { useLang } from '@/i18n';

interface Props {
  levels: Record<DimensionKey, Level>;
  dimScores: Record<DimensionKey, number>;
}

export function DimensionDetails({ levels, dimScores }: Props) {
  const { dim } = useLang();

  const models: Record<string, DimensionKey[]> = {};
  DIMENSION_ORDER.forEach(d => {
    const m = dim(d).model;
    if (!models[m]) models[m] = [];
    models[m].push(d);
  });

  return (
    <>
      {Object.entries(models).map(([model, dims]) => (
        <div key={model} className="mb-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{model}</h4>
          <div className="space-y-2">
            {dims.map(d => {
              const dimData = dim(d);
              return (
                <div key={d} className="flex items-start gap-2">
                  <span className={`shrink-0 w-7 text-center text-xs font-mono py-0.5 rounded lvl-${levels[d]} font-bold`}>
                    {levels[d]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium">
                      {dimData.name} <span className="text-slate-400 font-normal">({dimScores[d]}/6)</span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5">
                      {dimData[levels[d]]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

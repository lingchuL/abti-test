'use client';

import { useEffect, useCallback } from 'react';
import { DIMENSION_ORDER, DIMENSION_META, type Level } from '@/data/dimensions';
import type { Outcome } from '@/data/outcomes';
import { sharePersonality } from '@/lib/share';
import { useToast } from '@/components/Toast';
import { rarityTier } from './GalleryCard';
import { useLang } from '@/i18n';

interface Props {
  outcome: Outcome | null;
  onClose: () => void;
}

export function PersonalityModal({ outcome: o, onClose }: Props) {
  const { showToast } = useToast();
  const { t, oc, dim } = useLang();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (o) {
      document.body.classList.add('no-scroll');
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [o, handleKeyDown]);

  if (!o) return null;

  const text = oc(o.code);
  const tier = rarityTier(o.rarity.percent, t);

  const handleShare = async () => {
    const success = await sharePersonality(o, text, t);
    if (success && !navigator.share) {
      showToast(t.copiedToClipboard);
    } else if (!success) {
      showToast(t.copyFailed);
    }
  };

  function buildPatternTable(pattern: string) {
    const letters = pattern.replace(/-/g, '');
    const models: Record<string, { dimKey: string; level: Level }[]> = {};
    DIMENSION_ORDER.forEach((d, i) => {
      const dimData = dim(d);
      const m = dimData.model;
      if (!models[m]) models[m] = [];
      models[m].push({ dimKey: d, level: letters[i] as Level });
    });

    return Object.entries(models).map(([model, dims]) => (
      <div key={model} className="mb-3">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{model}</h4>
        <div className="space-y-1.5">
          {dims.map(({ dimKey, level }) => {
            const dimData = dim(dimKey);
            return (
              <div key={dimKey} className="flex items-start gap-2">
                <span className={`shrink-0 w-7 text-center text-xs font-mono py-0.5 rounded lvl-${level} font-bold`}>{level}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium">{dimData.name}</div>
                  <div className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    {dimData[level]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-x-0 bottom-0 top-8 sm:top-16 bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl sm:max-w-2xl sm:mx-auto sm:bottom-8 shadow-2xl overflow-hidden flex flex-col modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="w-9" />
          <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          <button onClick={onClose} aria-label="close" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 sm:px-6 py-5 fade-in">
            <div className="flex justify-center mb-4">
              <div className="emoji-avatar-lg" style={{ background: `${o.color}20` }}>
                <span>{o.emoji}</span>
              </div>
            </div>
            <div className="text-center mb-3">
              <div className="text-2xl sm:text-3xl font-bold">{o.code}</div>
              <div className="text-base text-slate-600 dark:text-slate-400 mt-0.5">{text.cn}</div>
              <div className="mt-2 text-sm italic text-slate-500">&ldquo;{text.intro}&rdquo;</div>
            </div>
            <div className="mb-4 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white shadow-lg" style={{ background: o.color }}>
                <span>🎲</span>
                <div className="text-left">
                  <div className="text-xs opacity-90">{t.theoreticalRarity} · {tier.label}</div>
                  <div className="text-sm font-bold">{o.rarity.percent}% · {t.approx.replace('{x}', String(o.rarity.oneInX))}</div>
                </div>
              </div>
            </div>
            {o.pattern && (
              <div className="mb-4 flex justify-center">
                <code className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">{o.pattern}</code>
              </div>
            )}
            {o.trigger && (
              <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-amber-950/30 border border-slate-200 dark:border-amber-900/50">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-amber-200 mb-1">
                  <span>{o.trigger.badge}</span><span>{text.triggerLabel ?? o.trigger.label}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-amber-300/80 font-mono mb-1.5">{text.triggerCondition ?? o.trigger.condition}</div>
                <p className="text-xs text-slate-600 dark:text-amber-300/80 leading-relaxed">{text.triggerDescription ?? o.trigger.description}</p>
              </div>
            )}
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.oneLineReading}</h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{text.oneLiner}</p>
            </div>
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.fullReading}</h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{text.desc}</p>
            </div>
            {o.pattern && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.dimTemplate}</h3>
                {buildPatternTable(o.pattern)}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 flex gap-2" style={{ paddingBottom: 'calc(.75rem + var(--safe-bottom))' }}>
          <button onClick={handleShare} className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[.98] text-white font-medium transition flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {t.share}
          </button>
        </div>
      </div>
    </div>
  );
}

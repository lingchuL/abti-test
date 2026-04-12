'use client';

import Link from 'next/link';
import type { QuizResult, ScoredOutcome } from '@/lib/scoring';
import { shareResult } from '@/lib/share';
import { useToast } from '@/components/Toast';
import { DimensionDetails } from './DimensionDetails';
import { Top5List } from './Top5List';
import { useLang } from '@/i18n';

interface Props {
  data: QuizResult;
}

export function ResultDisplay({ data }: Props) {
  const { showToast } = useToast();
  const { t, oc } = useLang();
  const { mode, result, best, top5, levels, dimScores, patternStr } = data;

  const resultText = oc(result.code);
  const bestText = oc(best.code);

  const handleShare = async () => {
    const success = await shareResult(result, resultText, t);
    if (success && !navigator.share) {
      showToast(t.copiedToClipboard);
    } else if (!success) {
      showToast(t.copyFailed);
    }
  };

  return (
    <div className="slide-up">
      {/* Mode label */}
      <div className="text-center mb-4">
        {mode === 'catnip' && (
          <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-bold">
            {t.catnipMode}
          </span>
        )}
        {mode === 'fallback' && (
          <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full text-sm font-bold">
            {t.fallbackMode}
          </span>
        )}
        {mode === 'normal' && (
          <span className="inline-block px-4 py-2 bg-orange-50 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full text-sm font-bold">
            {t.normalMode}
          </span>
        )}
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="emoji-avatar-lg bounce-in" style={{ background: `${result.color}20` }}>
          <span>{result.emoji}</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-black">{result.code}</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">{resultText.cn}</p>
        <p className="mt-2 text-sm italic text-slate-500">&ldquo;{resultText.intro}&rdquo;</p>
      </div>

      {/* Similarity info */}
      <p className="text-center text-sm text-slate-500 mb-6">
        {mode === 'normal'
          ? t.matchInfo
              .replace('{sim}', String((best as ScoredOutcome).similarity))
              .replace('{exact}', String((best as ScoredOutcome).exact))
              .replace('{dist}', String((best as ScoredOutcome).dist))
          : mode === 'catnip'
          ? t.catnipMatch
              .replace('{code}', best.code)
              .replace('{cn}', bestText.cn)
              .replace('{sim}', String(best.similarity))
          : t.fallbackMatch
              .replace('{code}', best.code)
              .replace('{cn}', bestText.cn)
              .replace('{sim}', String(best.similarity))}
      </p>

      {/* Rarity */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white shadow-lg" style={{ background: result.color }}>
          <span className="text-lg">🎲</span>
          <div className="text-left">
            <div className="text-xs opacity-90">{t.theoreticalRarity}</div>
            <div className="text-sm font-bold">{result.rarity.percent}% · {t.approx.replace('{x}', String(result.rarity.oneInX))}</div>
          </div>
        </div>
      </div>

      {/* Type pattern */}
      {result.pattern && (
        <div className="flex justify-center mb-6">
          <code className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">{result.pattern}</code>
        </div>
      )}

      {/* User pattern */}
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <p className="text-xs text-slate-400 mb-1">{t.yourPetVector}</p>
          <code className="text-xs px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 font-mono">{patternStr}</code>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="text-sm font-bold text-orange-500 mb-2">{t.personalityReading}</h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{resultText.desc}</p>
      </div>

      {/* Top 5 */}
      <div className="mb-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="text-sm font-bold text-orange-500 mb-3">{t.top5Title}</h3>
        <Top5List top5={top5} />
      </div>

      {/* 15 Dimensions */}
      <div className="mb-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="text-sm font-bold text-orange-500 mb-3">{t.dimDetailsTitle}</h3>
        <DimensionDetails levels={levels} dimScores={dimScores} />
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-8">
        <button onClick={handleShare} className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[.98] text-white font-bold transition">
          {t.shareResult}
        </button>
        <Link href="/gallery" className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium transition text-center">
          {t.allPersonalities}
        </Link>
      </div>
    </div>
  );
}

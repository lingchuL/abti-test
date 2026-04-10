'use client';

import Link from 'next/link';
import type { QuizResult, ScoredOutcome } from '@/lib/scoring';
import { shareResult } from '@/lib/share';
import { useToast } from '@/components/Toast';
import { DimensionDetails } from './DimensionDetails';
import { Top5List } from './Top5List';

interface Props {
  data: QuizResult;
}

export function ResultDisplay({ data }: Props) {
  const { showToast } = useToast();
  const { mode, result, best, top5, levels, dimScores, patternStr } = data;

  const handleShare = async () => {
    const success = await shareResult(result);
    if (success && !navigator.share) {
      showToast('已复制到剪贴板');
    } else if (!success) {
      showToast('复制失败');
    }
  };

  return (
    <div className="slide-up">
      {/* Mode label */}
      <div className="text-center mb-4">
        {mode === 'catnip' && (
          <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-bold">
            🌿 隐藏人格已激活 · 猫薄荷异常因子已接管
          </span>
        )}
        {mode === 'fallback' && (
          <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full text-sm font-bold">
            🔧 系统强制兜底 · 你的宠物太独特了
          </span>
        )}
        {mode === 'normal' && (
          <span className="inline-block px-4 py-2 bg-orange-50 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full text-sm font-bold">
            🐾 你家毛孩子的主类型
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
        <p className="text-lg text-slate-600 dark:text-slate-400">{result.cn}</p>
        <p className="mt-2 text-sm italic text-slate-500">&ldquo;{result.intro}&rdquo;</p>
      </div>

      {/* Similarity info */}
      <p className="text-center text-sm text-slate-500 mb-6">
        {mode === 'normal'
          ? `匹配度 ${(best as ScoredOutcome).similarity}% · 精确命中 ${(best as ScoredOutcome).exact}/15 维度 · 曼哈顿距离 ${(best as ScoredOutcome).dist}`
          : mode === 'catnip'
          ? `最佳匹配常规人格：${best.code}（${best.cn}）· ${best.similarity}%`
          : `最佳匹配：${best.code}（${best.cn}）· ${best.similarity}%（低于60%触发兜底）`}
      </p>

      {/* Rarity */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white shadow-lg" style={{ background: result.color }}>
          <span className="text-lg">🎲</span>
          <div className="text-left">
            <div className="text-xs opacity-90">理论稀有度</div>
            <div className="text-sm font-bold">{result.rarity.percent}% · 约 1/{result.rarity.oneInX}</div>
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
          <p className="text-xs text-slate-400 mb-1">你的宠物维度向量</p>
          <code className="text-xs px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 font-mono">{patternStr}</code>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="text-sm font-bold text-orange-500 mb-2">性格解读</h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{result.desc}</p>
      </div>

      {/* Top 5 */}
      <div className="mb-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="text-sm font-bold text-orange-500 mb-3">最接近的 5 种人格</h3>
        <Top5List top5={top5} />
      </div>

      {/* 15 Dimensions */}
      <div className="mb-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="text-sm font-bold text-orange-500 mb-3">十五维度详解</h3>
        <DimensionDetails levels={levels} dimScores={dimScores} />
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-8">
        <button onClick={handleShare} className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[.98] text-white font-bold transition">
          分享结果
        </button>
        <Link href="/gallery" className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium transition text-center">
          全部人格
        </Link>
      </div>
    </div>
  );
}

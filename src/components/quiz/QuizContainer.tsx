'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuiz } from '@/hooks/useQuiz';
import { QuestionCard } from './QuestionCard';
import { ThemeToggleSmall } from '@/components/ThemeToggle';
import { LangSwitcher } from '@/components/LangSwitcher';
import { useLang } from '@/i18n';

export function QuizContainer() {
  const router = useRouter();
  const { t, q } = useLang();
  const {
    quizQuestions,
    answers,
    initQuiz,
    selectAnswer,
    total,
    answered,
    allAnswered,
    progress,
    submitQuiz,
  } = useQuiz();

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  const handleSubmit = () => {
    const result = submitQuiz();
    sessionStorage.setItem('abti-result', JSON.stringify(result));
    router.push('/result');
  };

  return (
    <>
      {/* Sticky header */}
      <header className="sticky top-0 z-30 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800" style={{ paddingTop: 'var(--safe-top)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="text-sm text-slate-500 hover:text-orange-500 transition flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.back}
            </Link>
            <span className="text-sm font-mono text-slate-500">{answered} / {total}</span>
            <div className="flex items-center gap-1">
              <LangSwitcher />
              <ThemeToggleSmall />
            </div>
          </div>
          <div className="w-full h-1.5 bg-orange-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="progress-fill h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      {/* Questions */}
      <main className="max-w-2xl mx-auto px-4 py-4 pb-32">
        <div className="space-y-4">
          {quizQuestions.map((question, idx) => {
            const localeQ = q(question.id);
            return (
              <QuestionCard
                key={question.id}
                question={question}
                localeText={localeQ}
                index={idx}
                selectedValue={answers[question.id]}
                onSelect={selectAnswer}
              />
            );
          })}
        </div>
      </main>

      {/* Submit bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200/60 dark:border-slate-800" style={{ paddingBottom: 'var(--safe-bottom)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <p className="flex-1 text-xs text-slate-500">
            {allAnswered
              ? t.allDone
              : t.remaining.replace('{n}', String(total - answered))}
          </p>
          <button
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 disabled:shadow-none transition"
          >
            {t.submitAndView}
          </button>
        </div>
      </div>
    </>
  );
}

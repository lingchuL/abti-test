'use client';

import type { Question } from '@/data/questions';
import type { QuestionLocale } from '@/i18n';
import { useLang } from '@/i18n';

const labels = ['A', 'B', 'C', 'D'];

interface Props {
  question: Question;
  localeText: QuestionLocale;
  index: number;
  selectedValue?: number;
  onSelect: (qid: string, value: number) => void;
}

export function QuestionCard({ question, localeText, index, selectedValue, onSelect }: Props) {
  const { t } = useLang();
  const isGate = question.type === 'gate';
  const isHidden = question.type === 'hidden';

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-orange-500">{t.questionLabel.replace('{n}', String(index + 1))}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
          isGate || isHidden
            ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
        }`}>
          {isGate ? t.supplementary : isHidden ? t.hiddenQuestion : t.dimHidden}
        </span>
      </div>
      <p className="text-sm sm:text-base font-medium mb-3 leading-relaxed">{localeText.text}</p>
      <div className="space-y-2">
        {question.options.map((opt, oi) => (
          <label
            key={opt.value}
            className={`opt-btn flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer hover:border-orange-300 dark:hover:border-orange-700 ${
              selectedValue === opt.value
                ? 'selected border-orange-500 dark:border-orange-500'
                : 'border-slate-200 dark:border-slate-700'
            }`}
            onClick={() => onSelect(question.id, opt.value)}
          >
            <span className="shrink-0 w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 flex items-center justify-center text-xs font-bold mt-0.5">
              {labels[oi]}
            </span>
            <span className="text-sm leading-relaxed">{localeText.options[oi] ?? opt.label}</span>
          </label>
        ))}
      </div>
    </article>
  );
}

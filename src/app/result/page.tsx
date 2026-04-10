'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { QuizResult } from '@/lib/scoring';
import { ResultDisplay } from '@/components/result/ResultDisplay';
import { ThemeToggleSmall } from '@/components/ThemeToggle';

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState<QuizResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('abti-result');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      router.replace('/');
    }
  }, [router]);

  if (!data) return null;

  return (
    <div className="relative z-10">
      <header className="sticky top-0 z-30 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800" style={{ paddingTop: 'var(--safe-top)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm text-slate-500 hover:text-orange-500 transition flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            首页
          </Link>
          <span className="text-sm font-bold text-orange-500">测试结果</span>
          <Link href="/quiz" className="text-sm text-orange-500 hover:text-orange-600 transition">
            重新测试
          </Link>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        <ResultDisplay data={data} />
      </main>
    </div>
  );
}

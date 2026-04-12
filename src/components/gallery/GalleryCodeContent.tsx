'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LangSwitcher } from '@/components/LangSwitcher';
import { GalleryGrid } from './GalleryGrid';
import { useLang } from '@/i18n';

export function GalleryCodeContent({ code }: { code: string }) {
  const { t } = useLang();

  return (
    <div className="relative z-10">
      <header className="sticky top-0 z-30 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800" style={{ paddingTop: 'var(--safe-top)' }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl">🐾</span>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold truncate">{t.galleryTitle}</h1>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">{t.gallerySubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Link href="/" className="px-3 py-1.5 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
              {t.goToQuiz}
            </Link>
            <LangSwitcher />
            <ThemeToggle className="!p-2 !border-0 !bg-transparent" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 pb-24">
        <GalleryGrid initialModalCode={code} />
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <p className="italic">{t.disclaimer}</p>
      </footer>
    </div>
  );
}

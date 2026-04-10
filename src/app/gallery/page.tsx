import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export default function GalleryPage() {
  return (
    <div className="relative z-10">
      <header className="sticky top-0 z-30 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800" style={{ paddingTop: 'var(--safe-top)' }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl">🐾</span>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold truncate">ABTI · 27 种宠物人格</h1>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">你家毛孩子是哪一种？</p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Link href="/" className="px-3 py-1.5 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
              去测试
            </Link>
            <ThemeToggle className="!p-2 !border-0 !bg-transparent" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 pb-24">
        <GalleryGrid />
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <p className="italic">仅供娱乐，别拿它当宠物医疗诊断、品种鉴定、或者训犬师考核标准。你的毛孩子不管是什么类型，都是最好的！</p>
      </footer>
    </div>
  );
}

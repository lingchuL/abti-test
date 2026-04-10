import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function HomePage() {
  return (
    <div className="relative z-10">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center slide-up">
          <div className="text-7xl sm:text-8xl mb-6 bounce-in">🐾</div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            <span className="text-orange-500">A</span>
            <span className="text-amber-500">B</span>
            <span className="text-yellow-500">T</span>
            <span className="text-orange-600">I</span>
          </h1>
          <p className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
            Animal Behavior Type Indicator
          </p>
          <p className="text-base text-slate-500 dark:text-slate-400 mb-1">宠物行为类型指标</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-8 max-w-md mx-auto">
            MBTI 测人格已经过时了，来测测你家毛孩子是什么性格吧！
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/quiz"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 active:scale-[.97] text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/25 transition"
            >
              开始测试 🐾
            </Link>
            <Link
              href="/gallery"
              className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-2xl shadow-sm transition"
            >
              查看全部宠物人格
            </Link>
          </div>

          <div className="mt-8 inline-flex flex-wrap gap-1.5 justify-center text-xs">
            <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">27 种结局</span>
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">15 维度</span>
            <span className="px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300">30 + 1 题</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">猫狗通用</span>
          </div>
        </div>

        <ThemeToggle className="fixed top-4 right-4 z-50" />
      </div>
    </div>
  );
}

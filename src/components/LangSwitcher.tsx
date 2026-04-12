'use client';

import { useState, useRef, useEffect } from 'react';
import { useLang } from '@/i18n';
import { SUPPORTED_LOCALES } from '@/i18n';
import type { SupportedLocale } from '@/i18n';

export function LangSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale, data } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        aria-label="Switch language"
      >
        <span>{data.config.flag}</span>
        <span className="hidden sm:inline">{data.config.name}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 py-1 min-w-[120px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
          {SUPPORTED_LOCALES.map(l => (
            <button
              key={l.code}
              onClick={() => { setLocale(l.code as SupportedLocale); setOpen(false); }}
              className={`w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition ${
                locale === l.code ? 'text-orange-500 font-medium' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

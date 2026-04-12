'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { SupportedLocale, LocaleData, LocaleUI, QuestionLocale, DimensionLocale, OutcomeLocale } from './types';
import { getLocaleData, SUPPORTED_LOCALES, DEFAULT_LOCALE } from './registry';

interface LangContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: LocaleUI;
  q: (id: string) => QuestionLocale;
  dim: (id: string) => DimensionLocale;
  oc: (code: string) => OutcomeLocale;
  data: LocaleData;
}

const LangContext = createContext<LangContextValue | null>(null);

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function detectLocale(): SupportedLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  // 1. User's explicit choice
  const saved = localStorage.getItem('abti-lang');
  if (saved && SUPPORTED_LOCALES.some(l => l.code === saved)) {
    return saved as SupportedLocale;
  }

  // 2. Geo-based detection (Vercel IP country → cookie set by middleware)
  const geo = getCookie('abti-geo-locale');
  if (geo && SUPPORTED_LOCALES.some(l => l.code === geo)) {
    return geo as SupportedLocale;
  }

  // 3. Browser language
  const nav = navigator.language;
  if (nav.startsWith('pl')) return 'pl-PL';
  if (nav.startsWith('en')) return 'en-US';
  if (nav.startsWith('zh')) return 'zh-CN';

  // 4. Default for unknown languages
  return 'en-US';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE);
  const [data, setData] = useState<LocaleData>(getLocaleData(DEFAULT_LOCALE));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const detected = detectLocale();
    setLocaleState(detected);
    setData(getLocaleData(detected));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale === 'zh-CN' ? 'zh-CN' : locale === 'pl-PL' ? 'pl' : 'en';
    }
  }, [locale, mounted]);

  const setLocale = useCallback((code: SupportedLocale) => {
    setLocaleState(code);
    setData(getLocaleData(code));
    localStorage.setItem('abti-lang', code);
  }, []);

  const q = useCallback((id: string): QuestionLocale => {
    return data.questions[id] ?? { text: id, options: [] };
  }, [data]);

  const dim = useCallback((id: string): DimensionLocale => {
    return data.dimensions[id] ?? { name: id, model: '', L: '', M: '', H: '' };
  }, [data]);

  const oc = useCallback((code: string): OutcomeLocale => {
    return data.outcomes[code] ?? { cn: code, intro: '', oneLiner: '', desc: '' };
  }, [data]);

  return (
    <LangContext.Provider value={{ locale, setLocale, t: data.ui, q, dim, oc, data }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

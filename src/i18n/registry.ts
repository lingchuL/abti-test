import type { SupportedLocale, LocaleData, LocaleConfig } from './types';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';
import plPL from './locales/pl-PL';

const locales: Record<SupportedLocale, LocaleData> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'pl-PL': plPL,
};

export const DEFAULT_LOCALE: SupportedLocale = 'zh-CN';

export const SUPPORTED_LOCALES: LocaleConfig[] = Object.values(locales).map(l => l.config);

export function getLocaleData(code: SupportedLocale): LocaleData {
  return locales[code] ?? locales[DEFAULT_LOCALE];
}

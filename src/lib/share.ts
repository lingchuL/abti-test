import type { Outcome } from '@/data/outcomes';
import type { OutcomeLocale, LocaleUI } from '@/i18n';

export async function shareResult(result: Outcome, text: OutcomeLocale, t: LocaleUI): Promise<boolean> {
  const shareText = t.shareResultTemplate
    .replace('{code}', result.code)
    .replace('{cn}', text.cn)
    .replace('{intro}', text.intro)
    .replace('{pct}', String(result.rarity.percent))
    .replace('{x}', String(result.rarity.oneInX))
    .replace('{cta}', t.shareResultCta);

  if (navigator.share) {
    try {
      await navigator.share({ title: `ABTI · ${result.code} ${text.cn}`, text: shareText });
      return true;
    } catch { /* cancelled */ }
  }

  try {
    await navigator.clipboard.writeText(shareText);
    return true;
  } catch {
    return false;
  }
}

export async function sharePersonality(outcome: Outcome, text: OutcomeLocale, t: LocaleUI): Promise<boolean> {
  const shareText = t.sharePersonalityTemplate
    .replace('{code}', outcome.code)
    .replace('{cn}', text.cn)
    .replace('{intro}', text.intro)
    .replace('{pct}', String(outcome.rarity.percent));

  if (navigator.share) {
    try {
      await navigator.share({ title: `ABTI · ${outcome.code}`, text: shareText });
      return true;
    } catch { /* cancelled */ }
  }

  try {
    await navigator.clipboard.writeText(shareText);
    return true;
  } catch {
    return false;
  }
}

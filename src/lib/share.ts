import type { Outcome } from '@/data/outcomes';

export async function shareResult(result: Outcome): Promise<boolean> {
  const text = `🐾 我家毛孩子的 ABTI 宠物性格是 ${result.code}（${result.cn}）—— "${result.intro}"\n🎲 理论稀有度 ${result.rarity.percent}%（约 1/${result.rarity.oneInX}）\n快来测测你家的！`;

  if (navigator.share) {
    try {
      await navigator.share({ title: `ABTI · ${result.code} ${result.cn}`, text });
      return true;
    } catch { /* cancelled */ }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function sharePersonality(outcome: Outcome): Promise<boolean> {
  const text = `🐾 ABTI 宠物人格：${outcome.code}（${outcome.cn}）—— "${outcome.intro}"\n🎲 稀有度 ${outcome.rarity.percent}%`;

  if (navigator.share) {
    try {
      await navigator.share({ title: `ABTI · ${outcome.code}`, text });
      return true;
    } catch { /* cancelled */ }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

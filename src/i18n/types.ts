export type SupportedLocale = 'zh-CN' | 'en-US' | 'pl-PL';

export interface LocaleConfig {
  code: SupportedLocale;
  name: string;
  flag: string;
}

export interface LocaleUI {
  metaTitle: string;
  metaDescription: string;

  // Home
  siteSubtitle: string;
  siteTagline: string;
  startQuiz: string;
  viewAllPersonalities: string;
  badge27: string;
  badge15: string;
  badge30: string;
  badgeUniversal: string;

  // Gallery
  galleryTitle: string;
  gallerySubtitle: string;
  goToQuiz: string;
  disclaimer: string;
  standardPersonalities: string;
  specialPersonalities: string;

  // Quiz
  back: string;
  questionLabel: string; // "第 {n} 题" / "Q{n}"
  supplementary: string;
  hiddenQuestion: string;
  dimHidden: string;
  allDone: string;
  remaining: string; // "还剩 {n} 题没答。铲屎官，认真答题！"
  submitAndView: string;

  // Result header
  home: string;
  testResult: string;
  retake: string;

  // Result modes
  catnipMode: string;
  fallbackMode: string;
  normalMode: string;

  // Result content
  matchInfo: string; // "匹配度 {sim}% · 精确命中 {exact}/15 维度 · 曼哈顿距离 {dist}"
  catnipMatch: string; // "最佳匹配常规人格：{code}（{cn}）· {sim}%"
  fallbackMatch: string; // "最佳匹配：{code}（{cn}）· {sim}%（低于60%触发兜底）"
  theoreticalRarity: string;
  approx: string; // "约 1/{x}"
  yourPetVector: string;
  personalityReading: string;
  top5Title: string;
  dimDetailsTitle: string;
  shareResult: string;
  allPersonalities: string;
  copiedToClipboard: string;
  copyFailed: string;

  // Modal
  oneLineReading: string;
  fullReading: string;
  dimTemplate: string;
  share: string;

  // Rarity tiers
  rarityCommon: string;
  rarityMedium: string;
  rarityRare: string;
  rarityUltraRare: string;

  // Special labels
  specialFallback: string;
  specialHidden: string;

  // Share
  shareResultTemplate: string; // "🐾 ... {code}（{cn}）—— "{intro}" \n🎲 理论稀有度 {pct}%（约 1/{x}）\n{cta}"
  shareResultCta: string;
  sharePersonalityTemplate: string;
}

export interface QuestionLocale {
  text: string;
  options: string[];
}

export interface DimensionLocale {
  name: string;
  model: string;
  L: string;
  M: string;
  H: string;
}

export interface OutcomeLocale {
  cn: string;
  intro: string;
  oneLiner: string;
  desc: string;
  triggerLabel?: string;
  triggerCondition?: string;
  triggerDescription?: string;
}

export interface LocaleData {
  config: LocaleConfig;
  ui: LocaleUI;
  questions: Record<string, QuestionLocale>;
  dimensions: Record<string, DimensionLocale>;
  outcomes: Record<string, OutcomeLocale>;
}

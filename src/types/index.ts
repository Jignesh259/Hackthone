export type Language = 'gu' | 'hi' | 'en';

export interface ReportDetails {
  helpline: string;
  portal: string;
  steps: string[];
}

export interface AnalyzeResponse {
  level: 'safe' | 'suspicious' | 'scam';
  score: number;
  reasons: string[];
  matched_rules: string[];
  model_probability: number;
  report: ReportDetails;
  lang: string;
}

export interface ExampleItem {
  id: string;
  type?: string;
  lang: string;
  category: string;
  level: string;
  title: string;
  text: string;
}

export interface ExamplesResponse {
  examples: ExampleItem[];
  samples: Record<string, string>;
}

export interface StatsResponse {
  checked: string;
  blocked: string;
  speed: string;
  accuracy_pct: number;
  zero_retention: boolean;
  privacy: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  model_ready: boolean;
  metrics?: Record<string, unknown>;
}

export interface I18nContent {
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  yourMessage: string;
  enterText: string;
  encrypted: string;
  placeholder: string;
  pasteBtn: string;
  clearBtn: string;
  infoNote: string;
  verifyBtn: string;
  analyzingBtn: string;
  examplesTitle: string;
  examplesSub: string;
  statCheckedDefault: string;
  statCheckedLabel: string;
  statBlockedDefault: string;
  statBlockedLabel: string;
  statSpeedDefault: string;
  statSpeedLabel: string;
  lostMoneyTitle: string;
  lostMoneySub: string;
  lostMoneyDesc: string;
  goldenHourNote: string;
  whatWeCheckTitle: string;
  indicatorUrgencyTitle: string;
  indicatorUrgencyDesc: string;
  indicatorPhishingTitle: string;
  indicatorPhishingDesc: string;
  indicatorUpiTitle: string;
  indicatorUpiDesc: string;
  indicatorApkTitle: string;
  indicatorApkDesc: string;
  privacyGuaranteeTitle: string;
  privacyGuaranteeDesc: string;
  portalTitle: string;
  portalDept: string;
  portalSub: string;
  portalFileBtn: string;
  portalDialBtn: string;
  footerNeverSaved: string;
  footerHelpline: string;
  footerInitiative: string;
  footerCopyright: string;
  shareAlertBtn: string;
  copiedToast: string;
  copyTextBtn: string;
  menuCheck: string;
  menuHow: string;
  menuCommon: string;
  menuHelpline: string;
  liveAiActive: string;
  liveAiOffline: string;
  serverDownAlert: string;
  retryBtn: string;
  scrollDown: string;
  scrollToTop: string;
  jumpToCheck: string;
  jumpToResult: string;
  jumpToHow: string;
  jumpToScams: string;
  jumpToHelpline: string;
}

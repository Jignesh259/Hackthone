import React from 'react';
import type { Language, AnalyzeResponse, I18nContent } from '../types';

interface ResultCardProps {
  result: AnalyzeResponse;
  lang: Language;
  copied: boolean;
  t: I18nContent;
  onCopyAlert: () => void;
  onShareWhatsApp: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  lang,
  copied,
  t,
  onCopyAlert,
  onShareWhatsApp,
}) => {
  const isScam = result.level === 'scam';
  const isSuspicious = result.level === 'suspicious';
  const isSafe = result.level === 'safe';

  return (
    <div 
      id="resultPreview"
      className={`scroll-mt-28 mt-6 p-5 sm:p-7 rounded-2xl border-2 transition-all shadow-md ${
        isScam 
          ? 'bg-error-container/20 border-error/40 shadow-error/10' 
          : isSuspicious 
          ? 'bg-amber-50 border-amber-300 shadow-amber-500/10' 
          : 'bg-green-50 border-green-300 shadow-green-500/10'
      }`}
    >
      {/* Status Header & Risk Gauge */}
      <div className="flex items-start gap-4">
        <span 
          className={`material-symbols-outlined text-[40px] sm:text-[48px] shrink-0 ${
            isScam ? 'text-error' : isSuspicious ? 'text-amber-600' : 'text-green-600'
          }`} 
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isScam ? 'crisis_alert' : isSuspicious ? 'warning' : 'verified'}
        </span>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-headline-sm text-lg sm:text-2xl text-on-surface font-bold">
                {isScam 
                  ? (lang === 'gu' ? 'ચેતવણી: ખતરનાક સ્કેમ મેસેજ!' : lang === 'hi' ? 'चेतावनी: खतरनाक स्कैम संदेश!' : 'High-Risk Scam Alert!') 
                  : isSuspicious 
                  ? (lang === 'gu' ? 'સાવધાન: શંકાસ્પદ મેસેજ!' : lang === 'hi' ? 'सावधान: संदिग्ध संदेश!' : 'Warning: Suspicious Message!') 
                  : (lang === 'gu' ? 'સુરક્ષિત: કોઈ સ્કેમ સંકેત નથી' : lang === 'hi' ? 'सुरक्षित: कोई स्कैम संकेत नहीं' : 'Safe: Authentic Message')}
              </h3>
              <p className="font-label-sm text-xs sm:text-sm text-secondary mt-0.5">
                {lang === 'gu' 
                  ? 'હાઇબ્રિડ એનાલિસિસ (PyTorch AI + 13 સિક્યુરિટી રૂલ્સ)' 
                  : lang === 'hi'
                  ? 'हाइब्रिड विश्लेषण (PyTorch AI + 13 सुरक्षा नियम)'
                  : 'Hybrid Analysis (PyTorch AI Neural Model + 13 Security Rules)'}
              </p>
            </div>
            
            <span className={`px-4 py-1.5 rounded-full font-label-md text-sm sm:text-base font-extrabold shadow-xs shrink-0 ${
              isScam 
                ? 'bg-error text-on-error' 
                : isSuspicious 
                ? 'bg-amber-500 text-white' 
                : 'bg-green-600 text-white'
            }`}>
              {lang === 'gu' ? `જોખમ: ${result.score}%` : lang === 'hi' ? `जोखिम: ${result.score}%` : `Risk: ${result.score}%`}
            </span>
          </div>

          {/* Animated Risk Meter Bar */}
          <div className="w-full mt-4 bg-surface-container-high/60 rounded-full h-3 overflow-hidden p-0.5 border border-border/30">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                isScam 
                  ? 'bg-gradient-to-r from-amber-500 to-error' 
                  : isSuspicious 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
                  : 'bg-gradient-to-r from-emerald-400 to-green-600'
              }`}
              style={{ width: `${Math.max(result.score, 6)}%` }}
            />
          </div>

          {/* Analysis Reasons */}
          <div className="mt-4">
            <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wider">
              {lang === 'gu' ? 'મુખ્ય તારણો (Key Observations):' : 'Key Observations:'}
            </span>
            <ul className="mt-2 space-y-2 text-on-surface-variant font-body-md text-sm sm:text-base leading-relaxed">
              {result.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary mt-1 shrink-0">arrow_right</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Matched Rules Tags */}
          {result.matched_rules && result.matched_rules.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/30">
              <span className="font-label-sm text-xs text-secondary font-semibold mr-2">
                {lang === 'gu' ? 'ડિટેક્ટ થયેલા સિગ્નલ્સ:' : 'Detected Signals:'}
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {result.matched_rules.map((rule, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-xs font-bold border border-outline-variant/40 shadow-2xs">
                    <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                    {rule}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons: WhatsApp Share, Copy Alert & Helpline */}
          <div className="mt-5 pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-label-sm text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>{t.shareAlertBtn}</span>
              </button>
              <button
                type="button"
                onClick={onCopyAlert}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-xs sm:text-sm font-semibold transition-all border border-border/40 shadow-2xs cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                <span>{copied ? t.copiedToast : t.copyTextBtn}</span>
              </button>
            </div>

            {!isSafe && (
              <a 
                href="tel:1930" 
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-error text-on-error font-label-md text-xs sm:text-sm font-bold hover:bg-error/90 transition-all shadow-sm active:scale-95 animate-pulse"
              >
                <span className="material-symbols-outlined text-[18px]">emergency</span>
                <span>1930 Cyber Helpline</span>
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

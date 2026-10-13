import React from 'react';
import type { I18nContent } from '../types';

interface HelplineCardProps {
  t: I18nContent;
}

export const HelplineCard: React.FC<HelplineCardProps> = ({ t }) => {
  return (
    <div className="scroll-mt-28 bg-error-container/25 rounded-2xl p-5 sm:p-6 shadow-sm border border-error/25 relative overflow-hidden" id="helpline">
      <div className="flex items-start gap-3.5 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-error-container text-on-error-container flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[26px]">emergency_home</span>
        </div>
        <div>
          <h3 className="font-headline-sm text-lg sm:text-xl text-on-error-container font-bold leading-tight">
            {t.lostMoneyTitle}
          </h3>
          <span className="font-label-sm text-xs sm:text-sm text-error font-medium">
            {t.lostMoneySub}
          </span>
        </div>
      </div>
      <p className="font-body-md text-sm sm:text-base text-on-surface mb-4 leading-relaxed">
        {t.lostMoneyDesc}
      </p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <a 
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-error text-on-error hover:bg-error/90 font-label-lg text-sm sm:text-base font-bold shadow-sm transition-transform active:scale-95 min-h-[48px]" 
          href="tel:1930"
        >
          <span className="material-symbols-outlined text-[22px]">call</span>
          <span>Call 1930 (Toll Free)</span>
        </a>
        <a 
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-sm sm:text-base font-semibold shadow-2xs transition-colors min-h-[48px] border border-border/40 active:scale-95" 
          href="https://cybercrime.gov.in" 
          rel="noopener noreferrer" 
          target="_blank"
        >
          <span>cybercrime.gov.in</span>
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
        </a>
      </div>
      <div className="mt-3.5 flex items-center gap-2 text-on-surface-variant font-label-sm text-xs sm:text-sm bg-surface-container-lowest/60 p-2.5 rounded-xl">
        <span className="material-symbols-outlined text-[18px] text-error shrink-0">alarm</span>
        <span>{t.goldenHourNote}</span>
      </div>
    </div>
  );
};

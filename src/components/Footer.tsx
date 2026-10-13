import React from 'react';
import type { I18nContent } from '../types';

interface FooterProps {
  t: I18nContent;
  scrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ t, scrollToSection }) => {
  return (
    <footer className="w-full bg-surface-container-lowest mt-auto border-t border-surface-container-high/60">
      <div className="w-full bg-surface-container-low py-3.5 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-surface-container-high/60">
        <div className="w-full max-w-[1680px] 2xl:max-w-[1840px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 text-on-surface-variant font-body-md text-xs sm:text-sm">
            <span className="material-symbols-outlined text-[18px] text-primary">lock</span>
            <span>{t.footerNeverSaved}</span>
          </div>
          <div className="flex items-center gap-2 text-on-error-container font-label-md text-xs sm:text-sm font-semibold">
            <span className="material-symbols-outlined text-[16px] text-error">shield</span>
            <span>{t.footerHelpline}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1680px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-on-surface font-headline-sm text-base sm:text-lg font-bold">
            <span className="material-symbols-outlined text-primary text-[22px]">verified_user</span>
            <span>ScamShield Gujarat</span>
          </div>
          <p className="text-on-surface-variant font-body-md text-xs sm:text-sm">{t.footerInitiative}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
          <button 
            type="button" 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            {t.menuHow}
          </button>
          <button 
            type="button" 
            onClick={() => scrollToSection('common-scams')} 
            className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            {t.menuCommon}
          </button>
          <button 
            type="button" 
            onClick={() => scrollToSection('helpline')} 
            className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            {t.menuHelpline}
          </button>
        </div>

        <div className="text-on-surface-variant font-label-sm text-xs">{t.footerCopyright}</div>
      </div>
    </footer>
  );
};

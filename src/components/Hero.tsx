import React from 'react';
import type { I18nContent, AnalyzeResponse } from '../types';

interface HeroProps {
  t: I18nContent;
  result: AnalyzeResponse | null;
  scrollToSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ t, result, scrollToSection }) => {
  return (
    <div className="relative w-full" id="check">
      {/* Ambient Radial Glow bounded safely */}
      <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-80 bg-gradient-to-b from-primary-fixed/50 via-surface-container/20 to-transparent blur-3xl"></div>
      </div>
      
      <header className="w-full max-w-5xl mx-auto pt-6 sm:pt-10 pb-6 px-4 sm:px-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-surface-container text-on-primary-fixed font-label-md text-xs sm:text-sm font-semibold shadow-2xs mb-4">
          <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <span>{t.badge}</span>
        </div>
        
        <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight mb-2 sm:mb-4 font-extrabold">
          {t.title}
        </h1>
        <p className="font-headline-sm text-base sm:text-xl lg:text-2xl text-secondary font-medium mb-3">
          {t.subtitle}
        </p>
        <p className="font-body-lg text-sm sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          {t.desc}
        </p>

        {/* Quick Jump Navigation Pills for Fast Smooth Scrolling */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 max-w-3xl">
          <button 
            type="button"
            onClick={() => scrollToSection('check-card')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-secondary-container text-primary font-bold text-xs sm:text-sm border border-border/40 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">policy</span>
            <span>{t.jumpToCheck} ↓</span>
          </button>
          {result && (
            <button 
              type="button"
              onClick={() => scrollToSection('resultPreview')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer animate-pulse"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>{t.jumpToResult} ↓</span>
            </button>
          )}
          <button 
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm border border-border/40 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">manage_search</span>
            <span>{t.jumpToHow} ↓</span>
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('common-scams')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm border border-border/40 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
            <span>{t.jumpToScams} ↓</span>
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('helpline')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-error-container/40 hover:bg-error-container text-on-error-container font-bold text-xs sm:text-sm border border-error/30 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-error">call</span>
            <span>{t.jumpToHelpline} ↓</span>
          </button>
        </div>

        {/* Primary Animated Scroll-Down CTA */}
        <button 
          type="button"
          onClick={() => scrollToSection('check-card')}
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95 animate-soft-bounce"
        >
          <span className="material-symbols-outlined text-[20px]">south</span>
          <span>{t.scrollDown}</span>
        </button>
      </header>
    </div>
  );
};

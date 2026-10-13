import React, { useState } from 'react';
import type { Language, I18nContent } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  backendOnline: boolean;
  t: I18nContent;
  scrollToSection: (id: string) => void;
  onRetryConnection?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  backendOnline,
  t,
  scrollToSection,
  onRetryConnection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-sm border-b border-surface-container-high/40">
      <div className="w-full max-w-[1680px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Brand Logo & Civic Badge */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <a 
            href="#check" 
            onClick={(e) => { e.preventDefault(); scrollToSection('check'); }}
            className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[30px] sm:text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            <div className="flex flex-col">
              <span className="font-headline-md text-lg sm:text-2xl font-bold tracking-tight text-on-surface leading-tight">
                ScamShield
              </span>
              <span className="text-[9px] sm:text-xs text-primary font-semibold tracking-wider uppercase">
                Gujarat
              </span>
            </div>
          </a>
          
          {/* Live AI Status Pill - Clearly shows Online vs Down */}
          <button
            type="button"
            onClick={onRetryConnection}
            title={backendOnline ? 'AI Server Online' : 'AI Server Down - Click to retry connection'}
            className={`inline-flex items-center px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-label-sm border transition-all shadow-2xs cursor-pointer select-none ${
              backendOnline 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' 
                : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100 animate-pulse'
            }`}
          >
            {backendOnline ? (
              <span className="w-2.5 h-2.5 rounded-full mr-1.5 sm:mr-2 bg-emerald-600 animate-pulse shrink-0" />
            ) : (
              <span className="relative flex h-2.5 w-2.5 mr-1.5 sm:mr-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600" />
              </span>
            )}
            <span className="font-bold tracking-wide">
              {backendOnline ? t.liveAiActive : t.liveAiOffline}
            </span>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-2 lg:gap-3 2xl:gap-6">
          <button 
            type="button"
            onClick={() => handleNavClick('check-card')}
            className="transition-all bg-secondary-container text-primary font-body-md-medium rounded-xl px-4 py-2 text-sm lg:text-base font-semibold shadow-2xs hover:bg-secondary-container/80 cursor-pointer"
          >
            {t.menuCheck}
          </button>
          <button 
            type="button"
            onClick={() => handleNavClick('how-it-works')}
            className="text-on-surface-variant hover:text-on-surface transition-colors px-3 py-2 text-sm lg:text-base font-medium rounded-lg hover:bg-surface-container-low cursor-pointer"
          >
            {t.menuHow}
          </button>
          <button 
            type="button"
            onClick={() => handleNavClick('common-scams')}
            className="text-on-surface-variant hover:text-on-surface transition-colors px-3 py-2 text-sm lg:text-base font-medium rounded-lg hover:bg-surface-container-low cursor-pointer"
          >
            {t.menuCommon}
          </button>
          <button 
            type="button"
            onClick={() => handleNavClick('helpline')}
            className="text-on-surface-variant hover:text-on-surface transition-colors px-3 py-2 text-sm lg:text-base font-medium rounded-lg hover:bg-surface-container-low cursor-pointer"
          >
            {t.menuHelpline}
          </button>
        </nav>

        {/* Language Switcher, Call CTA & Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Language Selector */}
          <div aria-label="Language Selector" className="flex items-center bg-surface-container-low p-0.5 sm:p-1 rounded-full border border-outline-variant/30 shadow-2xs" role="group">
            <button 
              className={`px-2 sm:px-3.5 py-1 rounded-full font-label-sm text-xs sm:text-sm min-h-[30px] sm:min-h-[36px] flex items-center justify-center transition-all cursor-pointer ${
                lang === 'gu' ? 'bg-secondary-container text-primary font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button" 
              onClick={() => setLang('gu')}
            >
              ગુજરાતી
            </button>
            <button 
              className={`px-2 sm:px-3.5 py-1 rounded-full font-label-sm text-xs sm:text-sm min-h-[30px] sm:min-h-[36px] flex items-center justify-center transition-all cursor-pointer ${
                lang === 'hi' ? 'bg-secondary-container text-primary font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button" 
              onClick={() => setLang('hi')}
            >
              हिन्दी
            </button>
            <button 
              className={`px-2 sm:px-3.5 py-1 rounded-full font-label-sm text-xs sm:text-sm min-h-[30px] sm:min-h-[36px] flex items-center justify-center transition-all cursor-pointer ${
                lang === 'en' ? 'bg-secondary-container text-primary font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button" 
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>

          {/* National Helpline 1930 Call CTA */}
          <a 
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl bg-error-container text-on-error-container hover:bg-error-container/80 transition-all font-label-md text-xs sm:text-sm font-bold min-h-[36px] sm:min-h-[46px] border border-error/20 shrink-0 shadow-xs active:scale-95" 
            href="tel:1930"
            title="Call National Cyber Crime Helpline 1930"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-error">call</span>
            <span className="hidden sm:inline">1930 Helpline</span>
            <span className="sm:hidden font-mono font-bold">1930</span>
          </a>

          {/* Mobile Navigation Toggle Button */}
          <button
            className="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors cursor-pointer border border-border/40"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-surface-container-lowest border-b border-surface-container-high/60 px-4 py-3 shadow-lg flex flex-col gap-2 animate-fadeIn">
          <div 
            onClick={onRetryConnection}
            className={`px-4 py-2.5 rounded-xl text-xs flex items-center justify-between font-semibold border cursor-pointer ${
              backendOnline ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${backendOnline ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600 animate-ping'}`} />
              <span className="font-bold">{backendOnline ? t.liveAiActive : t.liveAiOffline}</span>
            </span>
            {!backendOnline && (
              <span className="text-[10px] underline uppercase tracking-wide">Retry</span>
            )}
          </div>
          <button 
            type="button"
            className="px-4 py-2.5 rounded-xl bg-secondary-container text-primary font-semibold text-sm flex items-center gap-2 text-left"
            onClick={() => handleNavClick('check-card')}
          >
            <span className="material-symbols-outlined text-[18px]">policy</span>
            <span>{t.menuCheck}</span>
          </button>
          <button 
            type="button"
            className="px-4 py-2.5 rounded-xl hover:bg-surface-container-low text-on-surface text-sm flex items-center gap-2 font-medium text-left"
            onClick={() => handleNavClick('how-it-works')}
          >
            <span className="material-symbols-outlined text-[18px]">manage_search</span>
            <span>{t.menuHow}</span>
          </button>
          <button 
            type="button"
            className="px-4 py-2.5 rounded-xl hover:bg-surface-container-low text-on-surface text-sm flex items-center gap-2 font-medium text-left"
            onClick={() => handleNavClick('common-scams')}
          >
            <span className="material-symbols-outlined text-[18px]">crisis_alert</span>
            <span>{t.menuCommon}</span>
          </button>
          <button 
            type="button"
            className="px-4 py-2.5 rounded-xl hover:bg-surface-container-low text-on-surface text-sm flex items-center gap-2 font-medium text-left"
            onClick={() => handleNavClick('helpline')}
          >
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>{t.menuHelpline}</span>
          </button>
        </div>
      )}
    </header>
  );
};

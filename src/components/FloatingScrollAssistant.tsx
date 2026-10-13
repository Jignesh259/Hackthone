import React from 'react';
import type { I18nContent, AnalyzeResponse } from '../types';

interface FloatingScrollAssistantProps {
  scrollY: number;
  result: AnalyzeResponse | null;
  t: I18nContent;
  scrollToSection: (id: string) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
}

export const FloatingScrollAssistant: React.FC<FloatingScrollAssistantProps> = ({
  scrollY,
  result,
  t,
  scrollToSection,
  scrollToTop,
  scrollToBottom,
}) => {
  return (
    <aside aria-label="Scroll Navigation" className="fixed bottom-6 right-4 sm:right-8 z-40 flex flex-col gap-2.5 items-end pointer-events-auto">
      {/* Dynamic View Result Jump Button */}
      {result && (
        <button
          type="button"
          onClick={() => scrollToSection('resultPreview')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-95 border-2 border-white animate-pulse"
          title="Jump to analysis result"
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{t.jumpToResult}</span>
        </button>
      )}

      {/* When near the top, display bouncing prompt to scroll down */}
      {scrollY < 300 ? (
        <button
          type="button"
          onClick={() => scrollToSection('check-card')}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-primary font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-border/60 hover:bg-secondary-container active:scale-95 animate-soft-bounce"
          title="Scroll Down to Message Check"
        >
          <span className="material-symbols-outlined text-[20px]">south</span>
          <span>{t.scrollDown}</span>
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Scroll down to next section */}
          <button
            type="button"
            onClick={() => {
              if (scrollY < 900) scrollToSection('how-it-works');
              else if (scrollY < 1500) scrollToSection('helpline');
              else scrollToBottom();
            }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-border/60 hover:bg-secondary-container active:scale-95"
            title="Scroll Down"
            aria-label="Scroll Down"
          >
            <span className="material-symbols-outlined text-[22px]">south</span>
          </button>

          {/* Scroll to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-border/60 hover:bg-secondary-container active:scale-95"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <span className="material-symbols-outlined text-[22px]">north</span>
          </button>
        </div>
      )}
    </aside>
  );
};

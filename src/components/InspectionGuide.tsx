import React from 'react';
import type { I18nContent } from '../types';

interface InspectionGuideProps {
  t: I18nContent;
}

export const InspectionGuide: React.FC<InspectionGuideProps> = ({ t }) => {
  return (
    <div className="scroll-mt-28 bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-md border border-border/50" id="how-it-works">
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-border/30">
        <span className="material-symbols-outlined text-primary text-[26px]">manage_search</span>
        <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold">
          {t.whatWeCheckTitle}
        </h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-surface-container-low border border-border/30 hover:border-primary/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-tertiary-container shrink-0 mt-0.5 shadow-2xs">
            <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
          </div>
          <div>
            <h4 className="font-label-lg text-sm sm:text-base text-on-surface font-bold">
              {t.indicatorUrgencyTitle}
            </h4>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
              {t.indicatorUrgencyDesc}
            </p>
          </div>
        </div>

        <div className="scroll-mt-28 flex items-start gap-3.5 p-3.5 rounded-xl bg-surface-container-low border border-border/30 hover:border-primary/40 transition-colors" id="common-scams">
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary shrink-0 mt-0.5 shadow-2xs">
            <span className="material-symbols-outlined text-[20px]">link_off</span>
          </div>
          <div>
            <h4 className="font-label-lg text-sm sm:text-base text-on-surface font-bold">
              {t.indicatorPhishingTitle}
            </h4>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
              {t.indicatorPhishingDesc}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-surface-container-low border border-border/30 hover:border-primary/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-error shrink-0 mt-0.5 shadow-2xs">
            <span className="material-symbols-outlined text-[20px]">pin</span>
          </div>
          <div>
            <h4 className="font-label-lg text-sm sm:text-base text-on-surface font-bold">
              {t.indicatorUpiTitle}
            </h4>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
              {t.indicatorUpiDesc}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-surface-container-low border border-border/30 hover:border-primary/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-tertiary shrink-0 mt-0.5 shadow-2xs">
            <span className="material-symbols-outlined text-[20px]">android</span>
          </div>
          <div>
            <h4 className="font-label-lg text-sm sm:text-base text-on-surface font-bold">
              {t.indicatorApkTitle}
            </h4>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
              {t.indicatorApkDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

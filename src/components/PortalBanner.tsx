import React from 'react';
import type { I18nContent } from '../types';

interface PortalBannerProps {
  t: I18nContent;
}

export const PortalBanner: React.FC<PortalBannerProps> = ({ t }) => {
  return (
    <section className="w-full max-w-[1680px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 my-8">
      <div className="w-full bg-surface-container-lowest rounded-2xl p-5 sm:p-7 shadow-sm border border-border/60 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[34px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              assured_workload
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-label-lg text-base sm:text-lg text-on-surface font-bold">
                {t.portalTitle}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-primary bg-surface-container font-label-sm text-xs font-bold border border-primary/20">
                {t.portalDept}
              </span>
            </div>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5">
              {t.portalSub}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <a 
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs sm:text-sm font-semibold min-h-[46px] transition-colors border border-border/40 active:scale-95" 
            href="https://cybercrime.gov.in" 
            rel="noopener noreferrer" 
            target="_blank"
          >
            <span className="material-symbols-outlined text-[18px]">report</span>
            <span>{t.portalFileBtn}</span>
          </a>
          <a 
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-error-container text-on-error-container hover:bg-error-container/80 font-label-md text-xs sm:text-sm font-bold min-h-[46px] transition-colors border border-error/20 active:scale-95" 
            href="tel:1930"
          >
            <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
            <span>{t.portalDialBtn}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import type { I18nContent } from '../types';

interface PrivacyGuaranteeProps {
  t: I18nContent;
}

export const PrivacyGuarantee: React.FC<PrivacyGuaranteeProps> = ({ t }) => {
  return (
    <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 shadow-xs border border-border/40 flex items-center gap-3.5">
      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-xs">
        <span className="material-symbols-outlined text-[24px]">enhanced_encryption</span>
      </div>
      <div className="flex-1">
        <p className="font-label-md text-sm sm:text-base text-on-surface font-bold">
          {t.privacyGuaranteeTitle}
        </p>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
          {t.privacyGuaranteeDesc}
        </p>
      </div>
    </div>
  );
};

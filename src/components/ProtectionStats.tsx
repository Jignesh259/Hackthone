import React from 'react';
import type { StatsResponse, I18nContent } from '../types';

interface ProtectionStatsProps {
  stats: StatsResponse | null;
  t: I18nContent;
}

export const ProtectionStats: React.FC<ProtectionStatsProps> = ({ stats, t }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-border/40 flex items-center gap-3.5 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0 shadow-2xs">
          <span className="material-symbols-outlined text-[24px]">shield_with_heart</span>
        </div>
        <div className="min-w-0">
          <div className="font-headline-sm text-xl sm:text-2xl text-on-surface leading-tight font-bold">
            {stats ? stats.checked : t.statCheckedDefault}
          </div>
          <div className="font-label-sm text-xs sm:text-sm text-secondary truncate">
            {t.statCheckedLabel}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-border/40 flex items-center gap-3.5 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-error-container/40 flex items-center justify-center text-error shrink-0 shadow-2xs">
          <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
        </div>
        <div className="min-w-0">
          <div className="font-headline-sm text-xl sm:text-2xl text-on-surface leading-tight font-bold">
            {stats ? stats.blocked : t.statBlockedDefault}
          </div>
          <div className="font-label-sm text-xs sm:text-sm text-secondary truncate">
            {t.statBlockedLabel}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-border/40 flex items-center gap-3.5 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0 shadow-2xs">
          <span className="material-symbols-outlined text-[24px]">speed</span>
        </div>
        <div className="min-w-0">
          <div className="font-headline-sm text-xl sm:text-2xl text-on-surface leading-tight font-bold">
            {stats ? stats.speed : t.statSpeedDefault}
          </div>
          <div className="font-label-sm text-xs sm:text-sm text-secondary truncate">
            {t.statSpeedLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

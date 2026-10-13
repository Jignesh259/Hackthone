import React from 'react';
import type { I18nContent, ExampleItem } from '../types';

interface MessageCheckerProps {
  message: string;
  setMessage: (msg: string) => void;
  loading: boolean;
  backendOnline: boolean;
  apiError: string | null;
  t: I18nContent;
  examplesList: ExampleItem[];
  onVerify: (text?: string) => void;
  onClear: () => void;
  onPaste: () => void;
  onExampleClick: (type: string) => void;
  onRetryConnection?: () => void;
}

export const MessageChecker: React.FC<MessageCheckerProps> = ({
  message,
  setMessage,
  loading,
  backendOnline,
  apiError,
  t,
  examplesList,
  onVerify,
  onClear,
  onPaste,
  onExampleClick,
  onRetryConnection,
}) => {
  return (
    <div id="check-card" className="scroll-mt-28 bg-surface-container-lowest rounded-2xl p-5 sm:p-7 shadow-md border border-border/60 transition-all hover:shadow-lg">
      
      {/* Inspection Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shadow-2xs">
            <span className="material-symbols-outlined text-[24px]">mark_email_unread</span>
          </div>
          <div>
            <h2 className="font-label-lg text-base sm:text-lg text-on-surface font-bold">{t.yourMessage}</h2>
            <span className="font-label-sm text-xs sm:text-sm text-secondary">{t.enterText}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-low text-secondary font-label-sm text-xs font-medium border border-border/30">
            <span className="material-symbols-outlined text-[14px] text-primary">lock</span>
            {t.encrypted}
          </span>
          <span className="font-label-sm text-xs sm:text-sm text-on-surface-variant font-mono bg-surface-container-low px-2 py-1 rounded-md">
            {message.length} / 2000
          </span>
        </div>
      </div>

      {/* Prominent AI Server Down Notice Inside Checker */}
      {!backendOnline && (
        <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 flex items-start gap-3 shadow-2xs animate-fadeIn">
          <span className="material-symbols-outlined text-[24px] text-rose-600 shrink-0 mt-0.5">cloud_off</span>
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base text-rose-900">
              🔴 {t.liveAiOffline}
            </p>
            <p className="text-xs sm:text-sm mt-1 text-rose-700 leading-relaxed">
              {t.serverDownAlert}
            </p>
            {onRetryConnection && (
              <button
                type="button"
                onClick={onRetryConnection}
                className="mt-2.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs active:scale-95 inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">sync</span>
                <span>{t.retryBtn}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Textarea Input */}
      <div className="relative w-full my-4">
        <textarea
          className="w-full p-4 sm:p-5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-lg text-base sm:text-lg resize-y focus:outline-none focus:bg-surface-container-lowest shadow-inner transition-colors min-h-[200px] sm:min-h-[240px] leading-relaxed border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
          maxLength={2000}
          placeholder={t.placeholder}
          rows={7}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-2">
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-sm font-semibold min-h-[44px] sm:min-h-[48px] transition-colors cursor-pointer border border-border/40 active:scale-98"
            type="button"
            onClick={onPaste}
            title="Paste from clipboard"
          >
            <span className="material-symbols-outlined text-[18px]">content_paste</span>
            <span>{t.pasteBtn}</span>
          </button>
          <button
            className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-2.5 rounded-xl text-secondary hover:text-on-surface font-label-md text-sm font-semibold min-h-[44px] sm:min-h-[48px] transition-colors cursor-pointer active:scale-98"
            type="button"
            onClick={onClear}
            title="Clear and wipe message"
          >
            <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
            <span>{t.clearBtn}</span>
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-secondary font-label-sm text-xs">
          <span className="material-symbols-outlined text-[16px] text-primary">info</span>
          <span>{t.infoNote}</span>
        </div>
      </div>

      {/* Verification Action CTA */}
      <button
        className={`w-full mt-3 h-14 sm:h-16 rounded-xl font-label-lg text-base sm:text-lg font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] min-h-[56px] sm:min-h-[64px] cursor-pointer disabled:opacity-60 ${
          !backendOnline
            ? 'bg-rose-600 hover:bg-rose-700 text-white'
            : 'bg-primary-container hover:bg-primary text-on-primary'
        }`}
        type="button"
        disabled={loading}
        onClick={() => onVerify()}
      >
        <span className="material-symbols-outlined text-[24px] sm:text-[28px]">
          {!backendOnline ? 'cloud_off' : 'policy'}
        </span>
        <span>
          {loading 
            ? t.analyzingBtn 
            : !backendOnline 
              ? `🔴 ${t.liveAiOffline} - ${t.verifyBtn}`
              : t.verifyBtn}
        </span>
      </button>

      {/* Specific Server Error Alert (if triggered on verify) */}
      {apiError && (
        <div className="mt-4 p-4 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container flex items-start gap-3">
          <span className="material-symbols-outlined text-[24px] text-error shrink-0">wifi_off</span>
          <div className="flex-1">
            <p className="font-bold text-sm">{t.liveAiOffline}</p>
            <p className="text-xs mt-1 text-on-error-container/90">{t.serverDownAlert}</p>
            <button
              onClick={() => onVerify()}
              className="mt-2.5 px-3 py-1.5 rounded-lg bg-error text-on-error font-bold text-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">sync</span>
              <span>{t.retryBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Try Examples */}
      <div className="mt-6 pt-5 border-t border-border/50">
        <div className="flex items-center justify-between mb-3">
          <span className="font-label-md text-sm sm:text-base text-on-surface font-semibold">
            {t.examplesTitle}
          </span>
          <span className="font-label-sm text-xs sm:text-sm text-secondary">
            {t.examplesSub}
          </span>
        </div>
        
        {/* Category Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            className="example-chip flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs sm:text-sm font-medium min-h-[48px] transition-all text-center cursor-pointer border border-border/30 hover:border-primary active:scale-95"
            type="button"
            onClick={() => onExampleClick('kyc')}
          >
            <span className="text-primary text-[18px]">💳</span>
            <span>KYC અપડેટ</span>
          </button>
          <button
            className="example-chip flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs sm:text-sm font-medium min-h-[48px] transition-all text-center cursor-pointer border border-border/30 hover:border-primary active:scale-95"
            type="button"
            onClick={() => onExampleClick('electricity')}
          >
            <span className="text-tertiary-container text-[18px]">⚡</span>
            <span>વીજળી બિલ</span>
          </button>
          <button
            className="example-chip flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs sm:text-sm font-medium min-h-[48px] transition-all text-center cursor-pointer border border-border/30 hover:border-primary active:scale-95"
            type="button"
            onClick={() => onExampleClick('job')}
          >
            <span className="text-primary text-[18px]">💼</span>
            <span>નોકરીની ઓફર</span>
          </button>
          <button
            className="example-chip flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs sm:text-sm font-medium min-h-[48px] transition-all text-center cursor-pointer border border-border/30 hover:border-primary active:scale-95"
            type="button"
            onClick={() => onExampleClick('upi')}
          >
            <span className="text-error text-[18px]">💸</span>
            <span>UPI કેશબેક</span>
          </button>
          <button
            className="example-chip flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs sm:text-sm font-medium min-h-[48px] transition-all text-center cursor-pointer border border-border/30 hover:border-primary active:scale-95"
            type="button"
            onClick={() => onExampleClick('apk')}
          >
            <span className="text-error text-[18px]">📱</span>
            <span>નકલી APK</span>
          </button>
          <button
            className="example-chip flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs sm:text-sm font-medium min-h-[48px] transition-all text-center cursor-pointer border border-border/30 hover:border-primary active:scale-95"
            type="button"
            onClick={() => onExampleClick('lottery')}
          >
            <span className="text-amber-600 text-[18px]">🎁</span>
            <span>લોટરી ઇનામ</span>
          </button>
        </div>

        {/* Extra Live Test Buttons */}
        {examplesList.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/20 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-secondary mr-1">Other Live Tests:</span>
            {examplesList.slice(0, 4).map((ex) => (
              <button
                key={ex.id}
                onClick={() => { setMessage(ex.text); onVerify(ex.text); }}
                className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-medium border border-border/30 transition-colors cursor-pointer"
              >
                {ex.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

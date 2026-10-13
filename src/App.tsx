import { useState, useEffect } from 'react';
import type { Language, AnalyzeResponse, StatsResponse, ExampleItem } from './types';
import { I18N_CONTENT } from './constants/i18n';
import { analyzeMessage, fetchExamples, fetchStats, checkHealth } from './api';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MessageChecker } from './components/MessageChecker';
import { ResultCard } from './components/ResultCard';
import { ProtectionStats } from './components/ProtectionStats';
import { HelplineCard } from './components/HelplineCard';
import { InspectionGuide } from './components/InspectionGuide';
import { PrivacyGuarantee } from './components/PrivacyGuarantee';
import { PortalBanner } from './components/PortalBanner';
import { Footer } from './components/Footer';
import { FloatingScrollAssistant } from './components/FloatingScrollAssistant';

export default function App() {
  const [lang, setLang] = useState<Language>('gu');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Dynamic backend state (zero hardcoded sample text in frontend)
  const [samples, setSamples] = useState<Record<string, string>>({});
  const [examplesList, setExamplesList] = useState<ExampleItem[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState<number>(0);

  const t = I18N_CONTENT[lang] || I18N_CONTENT.gu;

  // Track window scroll for smooth floating assistants
  useEffect(() => {
    const handleWindowScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  /**
   * Health Check Heartbeat - verifies if FastAPI AI server is reachable.
   * If server is down, triggers visible "AI Server Down" status across the UI.
   */
  const checkBackendStatus = async (): Promise<boolean> => {
    try {
      await checkHealth();
      setBackendOnline(true);
      setApiError(null);
      return true;
    } catch {
      setBackendOnline(false);
      return false;
    }
  };

  const loadBackendData = async () => {
    const isOnline = await checkBackendStatus();
    if (isOnline) {
      try {
        const exData = await fetchExamples();
        if (exData.samples) setSamples(exData.samples);
        if (exData.examples) setExamplesList(exData.examples);
      } catch (err) {
        console.warn('Backend examples error:', err);
      }

      try {
        const statsData = await fetchStats();
        setStats(statsData);
      } catch (err) {
        console.warn('Backend stats error:', err);
      }
    }
  };

  // Immediate check on mount + fast 4-second heartbeat for instant disconnect detection
  useEffect(() => {
    loadBackendData();
    const interval = setInterval(() => {
      checkBackendStatus();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Submit message for hybrid PyTorch AI analysis & smooth scroll down
  const handleVerify = async (textToVerify?: string) => {
    const text = (textToVerify !== undefined ? textToVerify : message).trim();
    if (!text) {
      alert(
        lang === 'gu'
          ? 'કૃપા કરીને પહેલાં કોઈ મેસેજ દાખલ કરો...'
          : lang === 'hi'
          ? 'कृपया पहले कोई संदेश दर्ज करें...'
          : 'Please enter a message first...'
      );
      return;
    }

    setLoading(true);
    setApiError(null);

    // Scroll down to the result area smoothly
    setTimeout(() => {
      scrollToSection('resultPreview');
    }, 80);

    try {
      const data = await analyzeMessage(text, lang);
      setResult(data);
      setBackendOnline(true);
      setTimeout(() => {
        scrollToSection('resultPreview');
      }, 140);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Backend connection error';
      setApiError(errMsg);
      setBackendOnline(false);
      setTimeout(() => {
        scrollToSection('check-card');
      }, 120);
    } finally {
      setLoading(false);
    }
  };

  // Zero-retention wipe: purge state from memory immediately
  const handleClear = () => {
    setMessage('');
    setResult(null);
    setApiError(null);
  };

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setMessage(clipText);
      }
    } catch {
      // Browser permissions fallback
    }
  };

  // 1-Click test from backend samples
  const handleExampleClick = (type: string) => {
    const sampleText = samples[type];
    if (sampleText) {
      setMessage(sampleText);
      handleVerify(sampleText);
    }
  };

  const handleCopyAlert = () => {
    if (!result) return;
    const alertText = `⚠️ ScamShield Alert (${result.level.toUpperCase()} - ${result.score}% Risk)\n\n` +
      `Message: "${message.substring(0, 120)}..."\n\n` +
      `Findings:\n${result.reasons.map(r => `• ${r}`).join('\n')}\n\n` +
      `🚨 Helpline: 1930 | cybercrime.gov.in`;

    navigator.clipboard.writeText(alertText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleShareWhatsApp = () => {
    if (!result) return;
    const alertText = `🚨 *ScamShield Alert: ${result.level === 'scam' ? 'ખતરનાક સ્કેમ ચેતવણી!' : 'શંકાસ્પદ મેસેજ!'}*\n\n` +
      `જોખમ સ્કોર: *${result.score}%*\n\n` +
      `*તારણ:*\n${result.reasons.map(r => `• ${r}`).join('\n')}\n\n` +
      `*સાવચેતી:* આ મેસેજમાં આપેલી લિંક પર ક્લિક ના કરો કે OTP/PIN શેર ના કરો.\n` +
      `📞 *સાયબર હેલ્પલાઇન:* 1930 (Toll-Free)\n` +
      `🌐 *સરકારી પોર્ટલ:* cybercrime.gov.in`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(alertText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-background font-body-md text-on-surface antialiased flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Header Navigation */}
      <Navbar 
        lang={lang}
        setLang={setLang}
        backendOnline={backendOnline}
        t={t}
        scrollToSection={scrollToSection}
        onRetryConnection={checkBackendStatus}
      />

      {/* Prominent Global AI Server Down Alert Banner */}
      {!backendOnline && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-md animate-fadeIn transition-all">
          <div className="w-full max-w-[1680px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 font-bold tracking-wide">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px] animate-pulse">cloud_off</span>
              <span>🔴 {t.serverDownAlert}</span>
            </div>
            <button
              type="button"
              onClick={() => checkBackendStatus()}
              className="px-3.5 py-1.5 rounded-lg bg-white text-red-700 hover:bg-red-50 font-bold text-xs sm:text-sm shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              <span>{t.retryBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Page Body */}
      <main className={`w-full flex-1 pb-12 transition-all ${!backendOnline ? 'pt-36 sm:pt-34' : 'pt-24'}`}>
        <div className="w-full flex flex-col">
          
          {/* Hero Section */}
          <Hero 
            t={t}
            result={result}
            scrollToSection={scrollToSection}
          />

          {/* 2-Column Responsive Layout */}
          <section className="w-full max-w-[1680px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 my-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Message Input & Result Display */}
              <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                <MessageChecker 
                  message={message}
                  setMessage={setMessage}
                  loading={loading}
                  backendOnline={backendOnline}
                  apiError={apiError}
                  t={t}
                  examplesList={examplesList}
                  onVerify={handleVerify}
                  onClear={handleClear}
                  onPaste={handlePaste}
                  onExampleClick={handleExampleClick}
                  onRetryConnection={checkBackendStatus}
                />

                {/* Analysis Result Card */}
                {result && (
                  <ResultCard 
                    result={result}
                    lang={lang}
                    copied={copied}
                    t={t}
                    onCopyAlert={handleCopyAlert}
                    onShareWhatsApp={handleShareWhatsApp}
                  />
                )}

                {/* Protection Statistics Strip */}
                <ProtectionStats 
                  stats={stats}
                  t={t}
                />
              </div>

              {/* Right Column: Helpline, Educational Guides & Privacy */}
              <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                <HelplineCard t={t} />
                <InspectionGuide t={t} />
                <PrivacyGuarantee t={t} />
              </div>

            </div>
          </section>

          {/* National Cybercrime Portal Endorsement Banner */}
          <PortalBanner t={t} />

        </div>
      </main>

      {/* 3. Floating Scroll Assistant & Jump Control */}
      <FloatingScrollAssistant 
        scrollY={scrollY}
        result={result}
        t={t}
        scrollToSection={scrollToSection}
        scrollToTop={scrollToTop}
        scrollToBottom={scrollToBottom}
      />

      {/* 4. Footer */}
      <Footer 
        t={t}
        scrollToSection={scrollToSection}
      />
    </div>
  );
}

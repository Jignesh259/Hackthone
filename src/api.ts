/**
 * ScamShield API Client.
 * Connects to the FastAPI backend (localhost, ngrok or production).
 * All API URLs and endpoints are dynamically loaded from .env:
 * - VITE_API_URL / VITE_API_BASE_URL
 * - VITE_API_HEALTH_PATH
 * - VITE_API_ANALYZE_PATH
 * - VITE_API_EXAMPLES_PATH
 * - VITE_API_STATS_PATH
 * - VITE_API_RULES_PATH
 *
 * Ensures zero data retention guarantee (no message text stored).
 */

import type {
  AnalyzeResponse,
  ExamplesResponse,
  StatsResponse,
  HealthResponse
} from './types';

// API Base URL loaded dynamically from .env
export const API_BASE_URL: string = (
  import.meta.env.VITE_API_URL || 
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000'
).trim().replace(/\/+$/, '');

// All Endpoint paths loaded dynamically from .env
export const API_ENDPOINTS = {
  health: (import.meta.env.VITE_API_HEALTH_PATH || '/health').trim(),
  analyze: (import.meta.env.VITE_API_ANALYZE_PATH || '/api/analyze').trim(),
  examples: (import.meta.env.VITE_API_EXAMPLES_PATH || '/api/examples').trim(),
  stats: (import.meta.env.VITE_API_STATS_PATH || '/api/stats').trim(),
  rules: (import.meta.env.VITE_API_RULES_PATH || '/api/rules').trim(),
};

/**
 * Check backend readiness (with quick 3s timeout for fast disconnect detection)
 */
export async function checkHealth(): Promise<HealthResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.health}`, {
      signal: controller.signal,
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

/**
 * Fetch demo examples and samples from backend (no hardcoded data in frontend)
 */
export async function fetchExamples(): Promise<ExamplesResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.examples}`, {
      signal: controller.signal,
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

/**
 * Fetch protection statistics from backend
 */
export async function fetchStats(): Promise<StatsResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.stats}`, {
      signal: controller.signal,
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

/**
 * Submit message to backend for hybrid PyTorch + Rule Engine analysis
 */
export async function analyzeMessage(text: string, lang: string): Promise<AnalyzeResponse> {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.analyze}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify({ text, lang })
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || `Server error ${res.status}`);
  }

  return res.json();
}

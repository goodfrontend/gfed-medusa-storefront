import { PERSONALIZATION_CONFIG } from './config';

export interface SegmentData {
  interest?: string;
  history?: string[];
  signals?: Record<string, unknown>;
}

const SIGNAL_COOKIE = '_jg_segment';

function buildCookieAttrs(): string {
  const maxAge = 60 * 60 * 24 * 7;
  if (process.env.NODE_ENV === 'production') {
    return `path=/;max-age=${maxAge};SameSite=none;secure;domain=.justgood.win`;
  }
  return `path=/;max-age=${maxAge};SameSite=Lax`;
}

export function getSegmentCookie(): SegmentData {
  const match = document.cookie.match(/_jg_segment=([^;]+)/);
  if (!match || !match[1]) return {};
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return {};
  }
}

export function setSegmentCookie(data: SegmentData) {
  document.cookie = `${SIGNAL_COOKIE}=${encodeURIComponent(JSON.stringify(data))};${buildCookieAttrs()}`;
}

export function emitSignal(type: string, payload?: unknown) {
  const data = getSegmentCookie();
  if (!data.signals) {
    data.signals = {};
  }
  data.signals[type] = payload ?? true;
  setSegmentCookie(data);
}

export function getSignal(type: string): unknown {
  const data = getSegmentCookie();
  return data.signals?.[type];
}

export function getAllSignals(): Record<string, unknown> {
  const data = getSegmentCookie();
  return data.signals ?? {};
}

export function clearSignals() {
  const data = getSegmentCookie();
  data.signals = {};
  setSegmentCookie(data);
}

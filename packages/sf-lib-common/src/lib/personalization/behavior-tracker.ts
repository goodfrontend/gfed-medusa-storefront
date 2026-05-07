export interface SegmentData {
  interest?: string;
  history?: string[];
  signals?: Record<string, unknown>;
}

const SIGNAL_COOKIE = '_jg_segment';

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
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `_jg_segment=${encodeURIComponent(JSON.stringify(data))};expires=${expires};path=/;SameSite=Lax`;
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

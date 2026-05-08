import Cookies from 'js-cookie';

export interface SegmentData {
  interest?: string;
  history?: string[];
  signals?: Record<string, unknown>;
}

const SIGNAL_COOKIE = '_jg_segment';

const isProd = process.env.NODE_ENV === 'production';

const cookieOptions: Cookies.CookieAttributes = isProd
  ? { path: '/', sameSite: 'none', secure: true, domain: '.justgood.win' }
  : { path: '/', sameSite: 'lax' };

export function getSegmentCookie(): SegmentData {
  const value = Cookies.get(SIGNAL_COOKIE);
  if (!value) return {};
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return {};
  }
}

export function setSegmentCookie(data: SegmentData) {
  const expires = 7;
  Cookies.set(
    SIGNAL_COOKIE,
    encodeURIComponent(JSON.stringify(data)),
    { ...cookieOptions, expires }
  );
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
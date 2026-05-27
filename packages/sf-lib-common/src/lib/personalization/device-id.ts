const DEVICE_ID_COOKIE = '_jg_device_id';

function buildCookieAttrs(maxAgeDays: number): string {
  const maxAge = maxAgeDays * 24 * 60 * 60;
  if (process.env.NODE_ENV === 'production') {
    return `path=/;max-age=${maxAge};SameSite=none;secure;domain=.justgood.win`;
  }
  return `path=/;max-age=${maxAge};SameSite=Lax`;
}

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getDeviceId(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`${DEVICE_ID_COOKIE}=([^;]+)`));
  if (match && match[1]) return decodeURIComponent(match[1]);
  const id = generateUUID();
  document.cookie = `${DEVICE_ID_COOKIE}=${encodeURIComponent(id)};${buildCookieAttrs(90)}`;
  return id;
}



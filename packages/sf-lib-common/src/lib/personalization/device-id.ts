const DEVICE_ID_COOKIE = '_jg_device_id';

export function getDeviceId(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`${DEVICE_ID_COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : '';
}



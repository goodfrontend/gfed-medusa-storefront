import { CACHE_TTL } from './config';
import type { AppConfig } from './types';

export function getNoCacheApps(config: AppConfig): string[] {
  return [config.ACCOUNT, config.CHECKOUT];
}

export function isStaticAsset(pathname: string): boolean {
  return (
    pathname.includes('/_next/static/') ||
    /\.[a-f0-9]{8,}\.(js|css)$/.test(pathname) ||
    pathname.startsWith('/horz-assets/') ||
    pathname.startsWith('/account-assets/') ||
    pathname.startsWith('/products-assets/') ||
    pathname.startsWith('/checkout-assets/')
  );
}

export function getCacheTtl(
  pathname: string,
  contentType: string,
  targetOrigin: string,
  noCacheApps: string[]
): number | null {
  // static assets - immutable
  if (
    pathname.includes('/_next/static/') ||
    /\.[a-f0-9]{8,}\.(js|css)$/.test(pathname)
  ) {
    return CACHE_TTL.STATIC;
  }

  // MFE assets - content-addressed
  if (
    pathname.startsWith('/horz-assets/') ||
    pathname.startsWith('/account-assets/') ||
    pathname.startsWith('/products-assets/') ||
    pathname.startsWith('/checkout-assets/')
  ) {
    return CACHE_TTL.ASSET;
  }

  // HTML pages - short cache, but not for account/checkout
  if (contentType.includes('text/html')) {
    if (noCacheApps.includes(targetOrigin)) {
      return null;
    }
    return CACHE_TTL.HTML;
  }

  return null;
}

export function getCacheKey(request: Request): Request {
  const url = new URL(request.url);
  url.searchParams.sort();
  return new Request(url.toString(), { method: 'GET' });
}

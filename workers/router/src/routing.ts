import type { AppConfig } from './types';

export function determineTargetApp(url: URL, config: AppConfig): string {
  const { pathname } = url;

  if (pathname.startsWith('/horz-assets/')) return config.HORIZONTAL_SERVICE;
  if (pathname.startsWith('/account-assets/')) return config.ACCOUNT;
  if (pathname.startsWith('/products-assets/')) return config.PRODUCTS;
  if (pathname.startsWith('/checkout-assets/')) return config.CHECKOUT;

  if (pathname.startsWith('/api/horz/')) return config.HORIZONTAL_SERVICE;
  if (pathname.startsWith('/api/products/')) return config.PRODUCTS;
  if (pathname.startsWith('/api/checkout/')) return config.CHECKOUT;
  if (pathname.startsWith('/api/account/')) return config.ACCOUNT;

  return determineAppFromPath(pathname, config);
}

function determineAppFromPath(pathname: string, config: AppConfig): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return config.HOME;

  const firstSegment = segments[0];
  const isLocale = firstSegment.length === 2;
  const targetSegment = isLocale ? segments[1] : firstSegment;

  if (!targetSegment) return config.HOME;

  if (targetSegment === 'account') return config.ACCOUNT;
  if (['checkout', 'cart', 'order'].includes(targetSegment))
    return config.CHECKOUT;
  if (
    ['store', 'products', 'categories', 'collections'].includes(targetSegment)
  )
    return config.PRODUCTS;

  return config.HOME;
}

export function transformPathname(pathname: string): string {
  if (pathname.startsWith('/horz-assets/')) {
    return pathname.replace('/horz-assets/', '/build/');
  }

  return pathname;
}

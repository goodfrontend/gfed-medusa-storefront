import { HORIZONTAL_COMPONENTS, getConfig } from './config';
import { proxyRequest } from './proxy';
import { determineTargetApp, transformPathname } from './routing';
import type { Env } from './types';

function isProductDetailPage(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  const isLocale = segments[0]?.length === 2;
  const s = isLocale ? segments.slice(1) : segments;
  // /products/:handle
  return s[0] === 'products' && typeof s[1] === 'string' && s[1].length > 0;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const config = getConfig(env);
    const url = new URL(request.url);
    const targetOrigin = determineTargetApp(url, config);
    const targetPathname = transformPathname(url.pathname);

    const horizontalComponents = HORIZONTAL_COMPONENTS.filter((c) => {
      if (c.name === 'product-price') {
        return isProductDetailPage(url.pathname);
      }

      // Page-aware filtering for personalized components
      if (c.name.startsWith('personalized-')) {
        if (targetOrigin === config.HOME) {
          return (
            c.name === 'personalized-banner' ||
            c.name === 'personalized-homepage-hero'
          );
        }
        if (targetOrigin === config.PRODUCTS) {
          const isDetail = isProductDetailPage(url.pathname);
          const isCategory = url.pathname.includes('/categories/');
          if (c.name === 'personalized-product-detail') return isDetail;
          if (c.name === 'personalized-category-page') return isCategory;
          if (c.name === 'personalized-search-results') return !isDetail && !isCategory;
          return false;
        }
        if (targetOrigin === config.CHECKOUT) {
          return (
            c.name === 'personalized-checkout' ||
            c.name === 'personalized-cart-page'
          );
        }
        // ACCOUNT or unknown targets — exclude all personalized components
        return false;
      }

      return true;
    });

    return proxyRequest(
      targetOrigin,
      targetPathname,
      url,
      request,
      ctx,
      config,
      horizontalComponents
    );
  },
};

import { buildDeviceIdCookie, HORIZONTAL_COMPONENTS, getConfig } from './config';
import { proxyRequest } from './proxy';
import { determineTargetApp, transformPathname } from './routing';
import type { Env } from './types';

const DEVICE_ID_COOKIE = '_jg_device_id';

function isProductDetailPage(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  const isLocale = segments[0]?.length === 2;
  const s = isLocale ? segments.slice(1) : segments;
  // /products/:handle
  return s[0] === 'products' && typeof s[1] === 'string' && s[1].length > 0;
}

function ensureDeviceId(request: Request): { deviceId: string; request: Request } {
  const cookieHeader = request.headers.get('Cookie') || '';
  const existing = cookieHeader.match(
    new RegExp(`${DEVICE_ID_COOKIE}=([^;]+)`)
  );
  if (existing) {
    try {
      return { deviceId: decodeURIComponent(existing[1] ?? ''), request };
    } catch {
      // Malformed cookie value — fall through to regenerate
    }
  }
  const deviceId = crypto.randomUUID();
  const separator = cookieHeader ? '; ' : '';
  const newHeaders = new Headers(request.headers);
  newHeaders.set(
    'Cookie',
    `${cookieHeader}${separator}${DEVICE_ID_COOKIE}=${encodeURIComponent(deviceId)}`
  );
  return { deviceId, request: new Request(request, { headers: newHeaders }) };
}

function setDeviceIdCookie(
  response: Response,
  deviceId: string,
  url: URL
): Response {
  const isProd = url.hostname.includes('justgood.win');
  const cookieString = buildDeviceIdCookie(deviceId, isProd);
  const newResponse = new Response(response.body, response);
  newResponse.headers.append('Set-Cookie', cookieString);
  return newResponse;
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
          return c.name === 'personalized-homepage';
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

    const { deviceId, request: req } = ensureDeviceId(request);

    const response = await proxyRequest(
      targetOrigin,
      targetPathname,
      url,
      req,
      ctx,
      config,
      horizontalComponents
    );

    if (response.headers.get('content-type')?.includes('text/html')) {
      return setDeviceIdCookie(response, deviceId, url);
    }

    return response;
  },
};

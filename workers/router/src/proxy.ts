import {
  getCacheKey,
  getCacheTtl,
  getNoCacheApps,
  isStaticAsset,
} from './caching';
import {
  fetchAllComponentResources,
  injectHorizontalComponents,
} from './horizontal-components';
import type { AppConfig, HorizontalComponentConfig } from './types';

export async function proxyRequest(
  targetOrigin: string,
  targetPathname: string,
  url: URL,
  request: Request,
  ctx: ExecutionContext,
  config: AppConfig,
  horizontalComponents: HorizontalComponentConfig[]
): Promise<Response> {
  const cache = caches.default;
  const cacheKey = getCacheKey(request);
  const noCacheApps = getNoCacheApps(config);
  const canCacheApp = !noCacheApps.includes(targetOrigin);

  if (
    request.method === 'GET' &&
    (isStaticAsset(url.pathname) || canCacheApp)
  ) {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  }

  const targetUrl = new URL(targetOrigin + targetPathname + url.search);

  const modifiedRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'manual',
  });
  modifiedRequest.headers.set('X-Forwarded-Host', url.hostname);
  modifiedRequest.headers.set('Host', targetUrl.hostname);

  const response = await fetch(modifiedRequest);

  const contentType = response.headers.get('content-type') || '';
  const cacheTtl = getCacheTtl(
    url.pathname,
    contentType,
    targetOrigin,
    noCacheApps
  );

  if (contentType.includes('text/html')) {
    const components = await fetchAllComponentResources(
      horizontalComponents,
      config,
      request
    );
    const transformedResponse = await injectHorizontalComponents(
      response,
      components,
      config
    );

    if (cacheTtl !== null && request.method === 'GET' && response.ok) {
      const newHeaders = new Headers(transformedResponse.headers);
      const cacheTags = newHeaders.get('X-Cache-Tag');
      newHeaders.delete('content-encoding');
      newHeaders.delete('content-length');
      newHeaders.set('Cache-Control', `public, max-age=${cacheTtl}`);
      if (cacheTags) newHeaders.set('Cache-Tag', cacheTags);

      const responseToCache = new Response(transformedResponse.body, {
        status: transformedResponse.status,
        statusText: transformedResponse.statusText,
        headers: newHeaders,
      });
      ctx.waitUntil(cache.put(cacheKey, responseToCache.clone()));
      return responseToCache;
    }

    return transformedResponse;
  }

  if (cacheTtl !== null && request.method === 'GET' && response.ok) {
    const newHeaders = new Headers(response.headers);
    const cacheTags = newHeaders.get('X-Cache-Tag');
    newHeaders.delete('content-encoding');
    newHeaders.delete('content-length');
    newHeaders.set('Cache-Control', `public, max-age=${cacheTtl}, immutable`);
    if (cacheTags) newHeaders.set('Cache-Tag', cacheTags);

    const responseToCache = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
    ctx.waitUntil(cache.put(cacheKey, responseToCache.clone()));
    return responseToCache;
  }

  const newHeaders = new Headers(response.headers);
  newHeaders.delete('content-encoding');
  newHeaders.delete('content-length');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

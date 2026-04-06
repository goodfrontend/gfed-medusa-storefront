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
  const acceptsHtml = request.headers.get('accept')?.includes('text/html');

  const loadComponents = () =>
    fetchAllComponentResources(horizontalComponents, config, request, ctx).then(
      (components) => ({ components, error: null }),
      (error) => ({ components: null, error })
    );

  let cachedResponse: Response | undefined = undefined;
  if (
    request.method === 'GET' &&
    (isStaticAsset(url.pathname) || canCacheApp)
  ) {
    cachedResponse = await cache.match(cacheKey);
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

  if (cachedResponse !== undefined && acceptsHtml) {
    const componentResult = await loadComponents();

    const transformedResponse = await injectHorizontalComponents(
      cachedResponse,
      componentResult.components ?? [],
      config
    );

    const newHeaders = new Headers(transformedResponse.headers);
    newHeaders.delete('content-encoding');
    newHeaders.delete('content-length');
    newHeaders.set('Cache-Control', 'private, no-store');

    return new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers: newHeaders,
    });
  }

  const componentsPromise =
    request.method === 'GET' && acceptsHtml ? loadComponents() : null;

  const response = await fetch(modifiedRequest);

  const responseContentType = response.headers.get('content-type') || '';
  const cacheTtl = getCacheTtl(
    url.pathname,
    responseContentType,
    targetOrigin,
    noCacheApps
  );

  if (responseContentType.includes('text/html')) {
    const componentResult = await (componentsPromise ?? loadComponents());

    if (componentResult.error) {
      const bareResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
      const newHeaders = new Headers(bareResponse.headers);
      newHeaders.delete('content-encoding');
      newHeaders.delete('content-length');
      newHeaders.set('Cache-Control', 'private, no-store');
      return new Response(bareResponse.body, {
        status: bareResponse.status,
        statusText: bareResponse.statusText,
        headers: newHeaders,
      });
    }

    const clonedResponse = response.clone();
    if (cacheTtl !== null && request.method === 'GET' && response.ok) {
      const cacheHeaders = new Headers();
      cacheHeaders.set('Cache-Control', `public, max-age=${cacheTtl}`);
      const responseToCache = new Response(clonedResponse.body, {
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
        headers: cacheHeaders,
      });
      ctx.waitUntil(cache.put(cacheKey, responseToCache));
    }

    const transformedResponse = await injectHorizontalComponents(
      response,
      componentResult.components ?? [],
      config
    );

    const newHeaders = new Headers(transformedResponse.headers);
    const cacheTags = newHeaders.get('X-Cache-Tag');
    newHeaders.delete('content-encoding');
    newHeaders.delete('content-length');
    newHeaders.set('Cache-Control', 'private, no-store');
    if (cacheTags) newHeaders.set('Cache-Tag', cacheTags);

    return new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers: newHeaders,
    });
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

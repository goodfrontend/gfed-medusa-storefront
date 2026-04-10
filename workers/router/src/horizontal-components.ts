import { CACHE_TTL } from './config';
import type {
  AppConfig,
  ComponentResources,
  HorizontalComponentConfig,
  HorizontalManifest,
} from './types';

let cachedManifest: HorizontalManifest | null = null;
let manifestFetchedAt = 0;

export async function getHorzManifest(
  config: AppConfig
): Promise<HorizontalManifest | null> {
  const now = Date.now();

  if (cachedManifest && now - manifestFetchedAt < CACHE_TTL.MANIFEST * 1000) {
    return cachedManifest;
  }

  try {
    const res = await fetch(
      `${config.HORIZONTAL_SERVICE}/build/.vite/manifest.json`
    );
    if (res.ok) {
      cachedManifest = await res.json();
      manifestFetchedAt = now;
    }
  } catch (e) {
    console.error('Failed to fetch horz manifest:', e);
  }

  return cachedManifest;
}

function extractBodyContent(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const content = bodyMatch ? (bodyMatch[1] ?? '') : html;
  return content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, '').trim();
}

function getComponentRequestHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  const cookie = request.headers.get('Cookie');
  if (cookie) {
    headers['Cookie'] = cookie;
  }

  // Forward the full host URL so horizontal components can derive
  // request-scoped params (e.g. PDP handle/countryCode) for SSR getData.
  headers['X-Storefront-Url'] = request.url;

  return headers;
}

function isSsrComponentPayload(
  payload: unknown
): payload is { html: string; data: unknown } {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'html' in payload &&
    typeof payload.html === 'string' &&
    'data' in payload
  );
}

function getComponentCacheKey(
  componentName: string,
  config: AppConfig
): Request {
  const url = `${config.HORIZONTAL_SERVICE}/__component-cache/${componentName}`;
  return new Request(url, { method: 'GET' });
}

async function getCachedComponentResources(
  componentConfig: HorizontalComponentConfig,
  config: AppConfig
): Promise<ComponentResources | null> {
  if (componentConfig.cacheable === false) {
    return null;
  }

  try {
    const cache = caches.default;
    const cacheKey = getComponentCacheKey(componentConfig.name, config);
    const cached = await cache.match(cacheKey);

    if (cached) {
      const payload = await cached.json<{ html: string; data: string }>();
      return {
        html: payload.html,
        data: payload.data,
        config: componentConfig,
      };
    }
  } catch {
    // Cache miss or error, fall through to fresh fetch.
  }

  return null;
}

async function cacheComponentResources(
  resources: ComponentResources,
  config: AppConfig,
  ctx: ExecutionContext
): Promise<void> {
  if (resources.config.cacheable === false) {
    return;
  }

  try {
    const cache = caches.default;
    const cacheKey = getComponentCacheKey(resources.config.name, config);
    const body = JSON.stringify({
      html: resources.html,
      data: resources.data,
    });

    const response = new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${CACHE_TTL.COMPONENT}`,
      },
    });

    ctx.waitUntil(cache.put(cacheKey, response));
  } catch {}
}

async function fetchComponentResourcesLegacy(
  componentConfig: HorizontalComponentConfig,
  config: AppConfig,
  headers: Record<string, string>
): Promise<ComponentResources> {
  const fragmentUrl = `${config.HORIZONTAL_SERVICE}/fragment/${componentConfig.name}`;
  const dataUrl = `${config.HORIZONTAL_SERVICE}/api/${componentConfig.name}`;

  const [htmlRes, dataRes] = await Promise.all([
    fetch(fragmentUrl, { headers }),
    fetch(dataUrl, { headers }),
  ]);

  const html = await htmlRes.text();
  const data = await dataRes.text();

  return {
    html: extractBodyContent(html),
    data,
    config: componentConfig,
  };
}

async function fetchComponentResources(
  componentConfig: HorizontalComponentConfig,
  config: AppConfig,
  request: Request
): Promise<ComponentResources> {
  const headers = getComponentRequestHeaders(request);
  const ssrUrl = `${config.HORIZONTAL_SERVICE}/ssr/${componentConfig.name}`;

  try {
    const ssrRes = await fetch(ssrUrl, { headers });

    if (ssrRes.ok) {
      const payload = await ssrRes.json();

      if (isSsrComponentPayload(payload)) {
        return {
          html: payload.html,
          data: JSON.stringify(payload.data ?? null),
          config: componentConfig,
        };
      }
    }
  } catch {
    // Fall back to the legacy fragment+api flow if the combined endpoint is unavailable.
  }

  return fetchComponentResourcesLegacy(componentConfig, config, headers);
}

export async function fetchAllComponentResources(
  configs: HorizontalComponentConfig[],
  appConfig: AppConfig,
  request: Request,
  ctx: ExecutionContext
): Promise<ComponentResources[]> {
  const results = await Promise.all(
    configs.map(async (componentConfig) => {
      // Try cache first for cacheable components.
      const cached = await getCachedComponentResources(
        componentConfig,
        appConfig
      );
      if (cached) {
        return cached;
      }

      // Fetch fresh from the horz service.
      const resources = await fetchComponentResources(
        componentConfig,
        appConfig,
        request
      );

      // Cache the result for cacheable components.
      cacheComponentResources(resources, appConfig, ctx);

      return resources;
    })
  );

  return results;
}

export async function injectHorizontalComponents(
  hostResponse: Response,
  components: ComponentResources[],
  config: AppConfig
): Promise<Response> {
  if (components.length === 0) {
    return hostResponse;
  }

  const manifest = await getHorzManifest(config);
  const { jsFile, cssFile } = Object.values(manifest ?? {}).reduce(
    (acc, value) => {
      if (value.file.endsWith('.js')) acc.jsFile = value.file;
      if (value.file.endsWith('.css')) acc.cssFile = value.file;
      return acc;
    },
    {
      jsFile: '',
      cssFile: '',
    }
  );

  const bundleUrl = jsFile ? `/horz-assets/${jsFile}` : '';
  const stylesheetUrl = cssFile ? `/horz-assets/${cssFile}` : '';

  const preloadTags = [
    stylesheetUrl
      ? `<link rel="preload" href="${stylesheetUrl}" as="style">`
      : '',
  ]
    .filter(Boolean)
    .join('');

  const bundleTag = bundleUrl
    ? `<script>window.__MFE_BUNDLE_URL__ = "${bundleUrl}";</script>`
    : '';

  const dataScripts = components
    .map(
      ({ data, config: compConfig }) =>
        `<script>window.${compConfig.dataVariable}=${data}</script>`
    )
    .join('\n');

  let rewriter = new HTMLRewriter().on('head', {
    element(el) {
      el.prepend(`${preloadTags}${bundleTag}${dataScripts}`, { html: true });
    },
  });

  for (const comp of components) {
    const { html, config: compConfig } = comp;

    const stylesheetTag = stylesheetUrl
      ? `<link rel="stylesheet" href="${stylesheetUrl}">`
      : '';
    const shadowContent = `<template shadowrootmode="open">${stylesheetTag}<div id="root-${compConfig.elementTag}">${html}</div></template>`;

    const injectionMode = compConfig.injectionMode ?? 'replace';

    rewriter = rewriter.on(compConfig.elementTag, {
      element(el) {
        try {
          if (injectionMode === 'prepend') {
            // Prepend preserves existing children (e.g. slotted child web
            // components like <mfe-cart slot="cart"> inside <mfe-header>).
            el.prepend(shadowContent, { html: true });
          } else {
            el.setInnerContent(shadowContent, { html: true });
          }
        } catch (e) {
          console.error('Failed to inject:', compConfig.elementTag, e);
        }
      },
    });
  }

  const transformedResponse = rewriter.transform(hostResponse);
  const newHeaders = new Headers(transformedResponse.headers);

  if (stylesheetUrl) {
    newHeaders.append('Link', `<${stylesheetUrl}>; rel=preload; as=style`);
  }

  newHeaders.delete('content-encoding');
  newHeaders.delete('content-length');

  return new Response(transformedResponse.body, {
    status: transformedResponse.status,
    statusText: transformedResponse.statusText,
    headers: newHeaders,
  });
}

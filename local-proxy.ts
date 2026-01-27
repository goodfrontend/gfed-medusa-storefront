import express, {
  Request as ExpressRequest,
} from 'express';
import { HTMLRewriter } from 'htmlrewriter';

const CONFIG = {
  HOME: 'http://localhost:3000',
  PRODUCTS: 'http://localhost:3001',
  ACCOUNT: 'http://localhost:3002',
  CHECKOUT: 'http://localhost:3003',
  HORIZONTAL_SERVICE: 'http://localhost:4001',
};

const HORIZONTAL_COMPONENTS = [
  {
    name: 'header',
    elementTag: 'mfe-header',
    dataVariable: '__HEADER_DATA__',
  },
  {
    name: 'footer',
    elementTag: 'mfe-footer',
    dataVariable: '__FOOTER_DATA__',
  },
];

const app = express();

app.use(async (req, res) => {
  const url = new URL(`http://localhost:8080${req.url}`);
  const targetOrigin = determineTargetApp(url);

  let targetPathname = url.pathname;
  const targetUrl = new URL(targetOrigin + targetPathname + url.search);

  try {
    // hop by hop headers https://0xn3va.gitbook.io/cheat-sheets/web-application/abusing-http-hop-by-hop-request-headers
    // must not be re-transmittedd
    const forbiddenHeaders = [
      'connection',
      'keep-alive',
      'proxy-authenticate',
      'proxy-authorization',
      'te',
      'trailers',
      'transfer-encoding',
      'upgrade',
      'host',
    ];

    const fetchHeaders = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (!forbiddenHeaders.includes(key.toLowerCase()) && value) {
        if (Array.isArray(value)) {
          value.forEach((v) => fetchHeaders.append(key, v));
        } else {
          fetchHeaders.set(key, value);
        }
      }
    }
    fetchHeaders.set('host', targetUrl.hostname);
    fetchHeaders.set('x-forwarded-host', url.hostname);

    const fetchOptions: RequestInit & { duplex?: string } = {
      method: req.method,
      headers: fetchHeaders,
      duplex: 'half',
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      fetchOptions.body = req as unknown as BodyInit;
    }

    const response = await fetch(targetUrl, fetchOptions);

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      const components = await fetchAllComponentResources(
        HORIZONTAL_COMPONENTS,
        req
      );
      const transformedResponse = await injectHorizontalComponents(
        response,
        components
      );

      transformedResponse.headers.forEach((value, name) => {
        res.set(name, value);
      });

      const buffer = await transformedResponse.arrayBuffer();
      res.send(Buffer.from(buffer));
    } else {
      response.headers.forEach((value: string, name: string) => {
        if (name.toLowerCase() !== 'content-encoding') {
          res.set(name, value);
        }
      });

      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Proxy error occurred');
  }
});

function determineTargetApp(url: URL): string {
  const { pathname } = url;

  if (pathname.startsWith('/home-assets/')) return CONFIG.HOME;
  if (pathname.startsWith('/account-assets/')) return CONFIG.ACCOUNT;
  if (pathname.startsWith('/products-assets/')) return CONFIG.PRODUCTS;
  if (pathname.startsWith('/checkout-assets/')) return CONFIG.CHECKOUT;

  if (pathname.includes('/_next/data/')) {
    const dataPath = pathname.split('/_next/data/')[1];
    const segments = dataPath.split('/').filter(Boolean);
    return determineAppFromPath('/' + segments.slice(1).join('/'));
  }

  if (pathname.startsWith('/api/')) return CONFIG.HOME;

  return determineAppFromPath(pathname);
}

function determineAppFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return CONFIG.HOME;

  const firstSegment = segments[0];
  const isLocale = firstSegment.length === 2;
  const targetSegment = isLocale ? segments[1] : firstSegment;

  if (!targetSegment) return CONFIG.HOME;

  if (targetSegment === 'account') return CONFIG.ACCOUNT;
  if (['checkout', 'cart', 'order'].includes(targetSegment))
    return CONFIG.CHECKOUT;
  if (
    ['store', 'products', 'categories', 'collections'].includes(targetSegment)
  )
    return CONFIG.PRODUCTS;

  return CONFIG.HOME;
}

function extractBodyContent(html: string) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  let content = bodyMatch ? (bodyMatch[1] ?? '') : html;
  return content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, '').trim();
}

interface Component {
  html: string;
  data: string;
  config: (typeof HORIZONTAL_COMPONENTS)[number];
}

async function fetchComponentResources(
  config: (typeof HORIZONTAL_COMPONENTS)[number],
  request: ExpressRequest
): Promise<Component> {
  const headers: Record<string, string> = {};
  if (request.headers.cookie) {
    headers['Cookie'] = request.headers.cookie;
  }

  const [htmlRes, dataRes] = await Promise.all([
    fetch(`${CONFIG.HORIZONTAL_SERVICE}/fragment/${config.name}`, { headers }),
    fetch(`${CONFIG.HORIZONTAL_SERVICE}/api/${config.name}`, { headers }),
  ]);

  const html = await htmlRes.text();
  const data = await dataRes.text();

  return {
    html: extractBodyContent(html),
    data,
    config,
  };
}

async function fetchAllComponentResources(
  configs: typeof HORIZONTAL_COMPONENTS,
  request: ExpressRequest
) {
  return Promise.all(
    configs.map((config) => fetchComponentResources(config, request))
  );
}

async function injectHorizontalComponents(
  hostResponse: Response,
  components: Component[]
): Promise<Response> {
  if (components.length === 0) {
    return hostResponse;
  }

  const bundleTag = `<script>window.__MFE_BUNDLE_URL__ = "${CONFIG.HORIZONTAL_SERVICE}/build/horizontal-components-bundle.js";</script>`;

  const dataScripts = components
    .map(
      ({ data, config }) =>
        `<script>window.${config.dataVariable}=${data}</script>`
    )
    .join('\n');

  let rewriter = new HTMLRewriter().on('head', {
    element(el) {
      el.append(`${bundleTag}${dataScripts}`, { html: true });
    },
  });

  for (const comp of components) {
    const { html, config } = comp;
    const stylesheetUrl = `${CONFIG.HORIZONTAL_SERVICE}/build/horizontal-components-styles.css`;

    const shadowContent = `<template shadowrootmode="open"><link rel="stylesheet" href="${stylesheetUrl}"><div id="root-${config.elementTag}">${html}</div></template>`;

    rewriter = rewriter.on(config.elementTag, {
      element(el) {
        try {
          el.setInnerContent(shadowContent, { html: true });
        } catch (e) {
          console.error(`Failed to inject ${config.elementTag}:`, e);
        }
      },
    });
  }

  const transformedResponse = rewriter.transform(hostResponse);
  const newHeaders = new Headers(transformedResponse.headers);
  newHeaders.delete('content-encoding');
  newHeaders.delete('content-length');

  return new Response(transformedResponse.body, {
    status: transformedResponse.status,
    statusText: transformedResponse.statusText,
    headers: newHeaders,
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

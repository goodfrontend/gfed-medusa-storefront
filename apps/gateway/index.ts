import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { FragmentGateway } from 'web-fragments/gateway';
import { getNodeMiddleware } from 'web-fragments/gateway/node';

const GATEWAY_PORT = 3024;
const app = express();
const gateway = new FragmentGateway();

const microfrontends = {
  // Key represents the base path in the main application URL
  // Value is the target URL of the specific microfrontend service
  home: 'http://localhost:3000',
  products: 'http://localhost:3001/dk/products',
  account: 'http://localhost:3002',
  checkout: 'http://localhost:3003',
};

// Fragments
gateway.registerFragment({
  fragmentId: 'header',
  endpoint: 'http://localhost:3000',
  routePatterns: [
    '/__wf/header/:_*',
    '/:_*/fragments/header',
    '/home-assets/:_*',
    '/:locale/fragments/header',
    '/:locale/fragments/header/:_*',
  ],
});
gateway.registerFragment({
  fragmentId: 'footer',
  endpoint: 'http://localhost:3000',
  routePatterns: [
    '/__wf/footer/:_*',
    '/:_*/fragments/footer',
    '/home-assets/:_*',
    '/:locale/fragments/footer',
    '/:locale/fragments/footer/:_*',
  ],
});
gateway.registerFragment({
  fragmentId: 'product-page',
  endpoint: 'http://localhost:3001',
  routePatterns: [
    '/__wf/product-page/:_*',
    '/:_*/products',
    '/products-assets/:_*',
    '/:locale/products',
    '/:locale/products/:_*',
  ],
});

// Pages
// gateway.registerFragment({
//   fragmentId: 'home',
//   endpoint: 'http://localhost:3000',
//   routePatterns: ['/__wf/home/home-assets/:_*', '/:locale', '/:locale/:_*'],
// });

// Normalize browser requests for fragment routes so the gateway treats them
// the same way curl (or XHR) requests are treated. Some browsers send
// `Accept: text/html` which the middleware may interpret as a page request
// instead of a fragment. Overwrite the header for fragment paths.
// app.use((req, _res, next) => {
//   const p = req.path || req.url || '';
//   const isFragmentPath =
//     /^\/__wf\//.test(p) || /^\/.*\/fragments(\/|$)/.test(p);
//   if (isFragmentPath) {
//     // Normalize headers that indicate a top-level navigation so the
//     // web-fragments middleware treats the request as a fragment fetch.
//     if (!req.headers.accept || req.headers.accept.includes('text/html')) {
//       req.headers.accept = '*/*';
//     }
//     // Browsers send Sec-Fetch-* headers for navigations; remove them so
//     // the gateway doesn't treat the fetch as a page navigation.
//     delete (req.headers as any)['sec-fetch-dest'];
//     delete (req.headers as any)['sec-fetch-mode'];
//     delete (req.headers as any)['sec-fetch-site'];
//     delete (req.headers as any)['sec-fetch-user'];
//     delete (req.headers as any)['upgrade-insecure-requests'];
//     // Optionally mark as XHR to be explicit
//     req.headers['x-requested-with'] = 'XMLHttpRequest';
//   }
//   next();
// });

app.use(
  '/dk/products',
  createProxyMiddleware({
    target: microfrontends.products,
    changeOrigin: true,
    // pathRewrite: {
    //   '^/dk/products': '/dk/products',
    // },
  })
);

app.use(
  '/products-assets',
  createProxyMiddleware({
    target: 'http://localhost:3001/products-assets',
    changeOrigin: true,
    pathRewrite: {
      '^/products-assets': '/products-assets',
    },
  })
);

app.use(getNodeMiddleware(gateway, { mode: 'development' }));

app.listen(GATEWAY_PORT, () => {
  console.log(`Gateway running on http://localhost:${GATEWAY_PORT}`);
});

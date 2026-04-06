import type { AppConfig, Env, HorizontalComponentConfig } from './types';

export function getConfig(env: Env): AppConfig {
  return {
    HOME: env.URL_HOME,
    PRODUCTS: env.URL_PRODUCTS,
    ACCOUNT: env.URL_ACCOUNT,
    CHECKOUT: env.URL_CHECKOUT,
    HORIZONTAL_SERVICE: env.URL_HORIZONTAL,
  };
}

export const HORIZONTAL_COMPONENTS: HorizontalComponentConfig[] = [
  {
    name: 'header',
    elementTag: 'mfe-header',
    dataVariable: '__HEADER_DATA__',
    cacheable: true,
    injectionMode: 'prepend',
  },
  {
    name: 'cart',
    elementTag: 'mfe-cart',
    dataVariable: '__CART_DATA__',
    cacheable: false,
  },
  {
    name: 'footer',
    elementTag: 'mfe-footer',
    dataVariable: '__FOOTER_DATA__',
    cacheable: true,
  },
];

export const CACHE_TTL = {
  /** Immutable static assets (1 year) */
  STATIC: 31536000,
  /** MFE assets with version hashing (1 year) */
  ASSET: 31536000,
  /** HTML pages (5 minutes) */
  HTML: 300,
  /** Manifest file (1 minute) */
  MANIFEST: 60,
  /** Cached horizontal component (5 minutes) */
  COMPONENT: 300,
} as const;

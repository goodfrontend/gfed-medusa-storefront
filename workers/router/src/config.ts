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
    name: 'product-price',
    elementTag: 'mfe-product-price',
    dataVariable: '__PRODUCT_PRICE_DATA__',
    cacheable: false,
  },
  {
    name: 'footer',
    elementTag: 'mfe-footer',
    dataVariable: '__FOOTER_DATA__',
    cacheable: true,
  },
  {
    name: 'personalized-banner',
    elementTag: 'mfe-personalized-banner',
    dataVariable: '__PERSONALIZED_BANNER_DATA__',
    cacheable: false,
    injectionMode: 'replace',
  },
  // Worker-driven personalization surfaces (always fresh, never cached)
  {
    name: 'personalized-homepage-hero',
    elementTag: 'mfe-personalized-homepage-hero',
    dataVariable: '__PERSONALIZED_HOMEPAGE_HERO__',
    cacheable: false,
    injectionMode: 'replace',
  },
  {
    name: 'personalized-search-results',
    elementTag: 'mfe-personalized-search-results',
    dataVariable: '__PERSONALIZED_SEARCH_RESULTS__',
    cacheable: false,
    injectionMode: 'replace',
  },
  {
    name: 'personalized-product-detail',
    elementTag: 'mfe-personalized-product-detail',
    dataVariable: '__PERSONALIZED_PRODUCT_DETAIL__',
    cacheable: false,
    injectionMode: 'replace',
  },
  {
    name: 'personalized-category-page',
    elementTag: 'mfe-personalized-category-page',
    dataVariable: '__PERSONALIZED_CATEGORY_PAGE__',
    cacheable: false,
    injectionMode: 'replace',
  },
  {
    name: 'personalized-checkout',
    elementTag: 'mfe-personalized-checkout',
    dataVariable: '__PERSONALIZED_CHECKOUT__',
    cacheable: false,
    injectionMode: 'replace',
  },
  {
    name: 'personalized-cart-page',
    elementTag: 'mfe-personalized-cart-page',
    dataVariable: '__PERSONALIZED_CART_PAGE__',
    cacheable: false,
    injectionMode: 'replace',
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

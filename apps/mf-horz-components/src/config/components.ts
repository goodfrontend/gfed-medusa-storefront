/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';

import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import type {
  GetCartItemCountQuery,
  GetCartItemCountQueryVariables,
  GetFooterDataQuery,
  GetFooterDataQueryVariables,
  ListRegionsQuery,
  ListRegionsQueryVariables,
} from '@gfed-medusa/sf-lib-common/types/graphql';

import { Cart } from '../components/cart';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { PersonalizedBanner } from '../components/personalized-banner';
import { PersonalizedSurface } from '../components/personalized-surface';
import { ProductPrice } from '../components/product-price';
import {
  computePrimaryInterest,
  getAudienceId,
  getSegmentFromCookie,
} from './utils/segment-utils';
import {
  deriveSurfaceContext,
} from './utils/derive-surface-context';
import {
  getDeviceIdFromCookieHeader,
  getPersonalization,
  sendPageViewSignal,
  sendSignal,
} from '@gfed-medusa/sf-lib-common/lib/data/personalization';
import { retrieveCustomer } from '@gfed-medusa/sf-lib-common/lib/data/customer';
import type { Customer } from '@gfed-medusa/sf-lib-common/types/graphql';

const customerCache = new Map<string, Promise<Customer | null>>();

function getCachedCustomer(ctx: StorefrontContext): Promise<Customer | null> {
  const cookieHeader = ctx.cookieHeader ?? '';
  if (!cookieHeader || !cookieHeader.includes('_medusa_jwt=')) {
    return Promise.resolve(null);
  }
  let promise = customerCache.get(cookieHeader);
  if (!promise) {
    promise = retrieveCustomer(ctx as StorefrontContext).catch(() => null);
    customerCache.set(cookieHeader, promise);
  }
  return promise;
}

export interface ComponentDefinition {
  name: string;
  component: ComponentType<any>;
  getData: (
    ctx?: StorefrontContext,
    request?: { storefrontUrl?: string }
  ) => Promise<any>;
  elementTag: string;
  dataVariable: string;
  cacheable?: boolean;
  injectionMode?: 'prepend' | 'append' | 'replace';
}

export const COMPONENT_REGISTRY: ComponentDefinition[] = [
  {
    name: 'header',
    component: Header,
    getData: async (ctx?: StorefrontContext) => {
      const [
        { createServerApolloClient, graphqlFetch },
        { LIST_REGIONS_QUERY },
      ] = await Promise.all([
        import('@gfed-medusa/sf-lib-common/lib/gql/apollo-client'),
        import('@gfed-medusa/sf-lib-common/lib/gql/queries/regions'),
      ]);

      const apolloClient = createServerApolloClient(ctx?.cookieHeader ?? '');

      const regionsData = await graphqlFetch<
        ListRegionsQuery,
        ListRegionsQueryVariables
      >({ query: LIST_REGIONS_QUERY }, apolloClient).catch(() => null);

      return {
        regions: regionsData?.regions ?? [],
      };
    },
    elementTag: 'mfe-header',
    dataVariable: '__HEADER_DATA__',
  },
  {
    name: 'cart',
    component: Cart,
    getData: async (ctx?: StorefrontContext) => {
      if (!ctx?.cartId) {
        return {};
      }

      const [
        { createServerApolloClient, graphqlFetch },
        { GET_CART_ITEM_COUNT_QUERY },
      ] = await Promise.all([
        import('@gfed-medusa/sf-lib-common/lib/gql/apollo-client'),
        import('@gfed-medusa/sf-lib-common/lib/gql/queries/cart-summary'),
      ]);

      const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');

      const cartData = await graphqlFetch<
        GetCartItemCountQuery,
        GetCartItemCountQueryVariables
      >(
        {
          query: GET_CART_ITEM_COUNT_QUERY,
          variables: { id: ctx.cartId },
        },
        apolloClient
      ).catch(() => null);

      const cartItemCount = cartData?.cart?.items?.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      return {
        ...(cartItemCount !== undefined && cartItemCount > 0
          ? { cartItemCount }
          : {}),
      };
    },
    elementTag: 'mfe-cart',
    dataVariable: '__CART_DATA__',
  },
  {
    name: 'footer',
    component: Footer,
    getData: async (ctx?: StorefrontContext) => {
      const [
        { createServerApolloClient, graphqlFetch },
        { GET_FOOTER_DATA_QUERY },
      ] = await Promise.all([
        import('@gfed-medusa/sf-lib-common/lib/gql/apollo-client'),
        import('@gfed-medusa/sf-lib-common/lib/gql/queries/footer'),
      ]);

      const apolloClient = createServerApolloClient(ctx?.cookieHeader ?? '');

      const result = await graphqlFetch<
        GetFooterDataQuery,
        GetFooterDataQueryVariables
      >(
        {
          query: GET_FOOTER_DATA_QUERY,
          variables: { collectionLimit: 6, categoryLimit: 4 },
        },
        apolloClient
      ).catch(() => ({ collections: [], productCategories: [], footer: null }));

      return {
        collections: result?.collections ?? [],
        productCategories: result?.productCategories ?? [],
        footerContent: result?.footer,
      };
    },
    elementTag: 'mfe-footer',
    dataVariable: '__FOOTER_DATA__',
  },
  {
    name: 'product-price',
    component: ProductPrice,
    getData: async (
      ctx?: StorefrontContext,
      request?: { storefrontUrl?: string }
    ) => {
      const storefrontUrl = request?.storefrontUrl;
      if (!storefrontUrl) {
        return { price: null, showFromPrefix: true };
      }

      let pathname = '';
      try {
        pathname = new URL(storefrontUrl).pathname;
      } catch {
        return { price: null, showFromPrefix: true };
      }

      const segments = pathname.split('/').filter(Boolean);
      const countryCode =
        segments[0] && segments[0].length === 2 ? segments[0] : '';
      const productsIndex = segments.indexOf('products');
      const handle =
        productsIndex >= 0 ? (segments[productsIndex + 1] ?? '') : '';

      if (!countryCode || !handle) {
        return { price: null, showFromPrefix: true };
      }

      const [
        { graphqlFetch },
        { getRegion },
        { GET_PRODUCT_CONTENT_BY_HANDLE_QUERY },
        { getPricesForVariant, getProductPrice },
      ] = await Promise.all([
        import('@gfed-medusa/sf-lib-common/lib/gql/apollo-client'),
        import('@gfed-medusa/sf-lib-common/lib/data/regions'),
        import('@gfed-medusa/sf-lib-products/lib/gql/queries/product'),
        import('@gfed-medusa/sf-lib-common/lib/utils/get-product-price'),
      ]);

      const region = await getRegion(countryCode, ctx as StorefrontContext);
      if (!region?.id) {
        return { price: null, showFromPrefix: true };
      }

      const data = await graphqlFetch<any, any>({
        query: GET_PRODUCT_CONTENT_BY_HANDLE_QUERY,
        variables: {
          handle,
          region_id: region.id,
          limit: 1,
        },
      }).catch(() => null);

      const product = data?.products?.products?.[0] ?? null;
      if (!product) {
        return { price: null, showFromPrefix: true };
      }

      const priceInfo = getProductPrice({ product });
      const cheapestPrice = priceInfo?.cheapestPrice ?? null;

      const pricesByVariantId = (product.variants ?? []).reduce(
        (acc: Record<string, any>, variant: any) => {
          if (!variant?.id) {
            return acc;
          }

          const price = getPricesForVariant(variant);
          if (!price) {
            return acc;
          }

          acc[variant.id] = price;
          return acc;
        },
        {}
      );

      return {
        cheapestPrice,
        pricesByVariantId,
        showFromPrefix: true,
      };
    },
    elementTag: 'mfe-product-price',
    dataVariable: '__PRODUCT_PRICE_DATA__',
  },
  {
    name: 'personalized-banner',
    component: PersonalizedBanner,
    getData: async (ctx?: StorefrontContext) => {
      const rawSegment = getSegmentFromCookie(ctx?.cookieHeader);

      const { getHomeBannerContent } =
        await import('@gfed-medusa/sf-lib-common/lib/data/home-banner');

      const { interest, confidence } = rawSegment
        ? computePrimaryInterest(rawSegment.history ?? [rawSegment.interest ?? ''])
        : { interest: '', confidence: 0 };

      const bannerContent = await getHomeBannerContent(
        interest
          ? { audience: getAudienceId(), segment: interest }
          : undefined
      );

      return { bannerContent, confidence };
    },
    elementTag: 'mfe-personalized-banner',
    dataVariable: '__PERSONALIZED_BANNER_DATA__',
  },

  // Personalization surfaces (worker-driven, always fresh)
];

const SURFACE_TAGS = [
  { surface: 'homepage_hero', tag: 'mfe-personalized-homepage-hero' },
  { surface: 'search_results', tag: 'mfe-personalized-search-results' },
  { surface: 'product_detail', tag: 'mfe-personalized-product-detail' },
  { surface: 'category_page', tag: 'mfe-personalized-category-page' },
  { surface: 'checkout', tag: 'mfe-personalized-checkout' },
  { surface: 'cart_page', tag: 'mfe-personalized-cart-page' },
] as const;

function createPersonalizedSurfaceComponent(surface: string, elementTag: string): ComponentDefinition {
  return {
    name: `personalized-${surface.replace(/_/g, '-')}`,
    component: PersonalizedSurface,
    getData: async (ctx?: StorefrontContext, request?: { storefrontUrl?: string }) => {
      const storefrontUrl = request?.storefrontUrl;
      if (!storefrontUrl) return { components: [] };

      const url = new URL(storefrontUrl);
      const deviceId = getDeviceIdFromCookieHeader(ctx?.cookieHeader);
      if (!deviceId) return { components: [] };

      const customer = await getCachedCustomer(ctx as StorefrontContext);
      const userId = customer?.id;

      const context = await deriveSurfaceContext(surface, url, ctx);
      const personalization = await getPersonalization(
        surface,
        url.pathname,
        deviceId,
        ctx as StorefrontContext,
        Object.keys(context).length > 0 ? context : undefined,
        userId
      );

      void sendPageViewSignal(surface, ctx as StorefrontContext, context, userId);

      if (surface === 'product_detail' && context.productId) {
        void sendSignal('PRODUCT_VIEW', ctx as StorefrontContext, {
          productId: context.productId,
          category: context.category,
          ...(context.price != null ? { price: context.price } : {}),
        }, undefined, userId);
      }

      const components = personalization?.components ?? [];

      // Resolve productIds to full product data via the PLP API
      if (components.length > 0) {
        const componentsWithProductIds = components.filter(
          (c) =>
            c.propsOverrides?.productIds &&
            Array.isArray(c.propsOverrides.productIds) &&
            (c.propsOverrides.productIds as string[]).length > 0
        );

        if (componentsWithProductIds.length > 0) {
          // Collect all unique product IDs across components
          const allProductIds = [
            ...new Set(
              componentsWithProductIds.flatMap(
                (c) => c.propsOverrides.productIds as string[]
              )
            ),
          ];
          const truncatedIds = allProductIds.slice(0, 50);
          if (allProductIds.length > 50) {
            console.warn('[createPersonalizedSurfaceComponent] Truncated product IDs from', allProductIds.length, 'to 50 for surface', surface);
          }

          // Extract countryCode from the URL pathname
          const segments = url.pathname.split('/').filter(Boolean);
          const countryCode =
            segments[0]?.length === 2 ? segments[0] : '';

          if (!countryCode) {
            console.warn('[createPersonalizedSurfaceComponent] Empty countryCode, skipping product resolution');
          } else if (truncatedIds.length > 0) {
            const plpUrl = `${url.origin}/api/products/plp?countryCode=${encodeURIComponent(countryCode)}&${truncatedIds.map((id) => `productId=${encodeURIComponent(id)}`).join('&')}`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            try {
              const response = await fetch(plpUrl, {
                headers: {
                  cookie: ctx?.cookieHeader ?? '',
                },
                signal: controller.signal,
              });
              clearTimeout(timeoutId);

              if (response.ok) {
                type ProductHit = {
                  id: string;
                  title?: string | null;
                  handle: string;
                  thumbnail?: string | null;
                  priceAmount?: number | null;
                  currencyCode?: string | null;
                  originalPriceAmount?: number | null;
                };

                const result = await response.json() as { products?: ProductHit[] };
                const products = result.products ?? [];

                const mappedProducts = products.map((hit) => ({
                  id: hit.id,
                  title: hit.title ?? '',
                  handle: hit.handle,
                  thumbnail: hit.thumbnail,
                  images: hit.thumbnail ? [{ id: hit.id, url: hit.thumbnail }] : [],
                  variants: hit.priceAmount != null ? [{
                    id: `${hit.id}-variant`,
                    price: {
                      amount: hit.priceAmount,
                      currencyCode: hit.currencyCode ?? 'USD',
                      priceType: hit.originalPriceAmount ? 'sale' : 'default',
                    },
                    ...(hit.originalPriceAmount != null ? {
                      originalPrice: {
                        amount: hit.originalPriceAmount,
                        currencyCode: hit.currencyCode ?? 'USD',
                        priceType: 'default',
                      },
                    } : {}),
                  }] : [],
                }));

                const enrichedComponents = components.map((comp) => {
                  const productIds = comp.propsOverrides?.productIds as string[] | undefined;
                  if (!productIds || productIds.length === 0) return comp;
                  const resolved = mappedProducts.filter((p) => productIds.includes(p.id));
                  if (resolved.length < productIds.length) {
                    console.warn('[createPersonalizedSurfaceComponent] Could not resolve', productIds.length - resolved.length, 'of', productIds.length, 'product IDs for surface', surface);
                  }
                  if (resolved.length === 0) return comp;
                  return {
                    ...comp,
                    propsOverrides: {
                      ...comp.propsOverrides,
                      products: resolved,
                    },
                  };
                });

                return { components: enrichedComponents };
              } else {
                console.warn('[createPersonalizedSurfaceComponent] PLP fetch failed with status', response.status, 'for surface', surface);
              }
            } catch (error) {
              clearTimeout(timeoutId);
              console.error('[createPersonalizedSurfaceComponent] Failed to resolve product IDs:', error);
            }
          }
        }
      }

      return { components };
    },
    elementTag,
    dataVariable: `__PERSONALIZED_${surface.toUpperCase().replace(/-/g, '_')}__`,
    cacheable: false,
    injectionMode: 'replace',
  };
}

for (const { surface, tag } of SURFACE_TAGS) {
  COMPONENT_REGISTRY.push(createPersonalizedSurfaceComponent(surface, tag));
}

export function getComponent(name: string): ComponentDefinition | undefined {
  return COMPONENT_REGISTRY.find((c) => c.name === name);
}

export function getComponentNames(): string[] {
  return COMPONENT_REGISTRY.map((c) => c.name);
}

import type { ComponentType } from 'react';

import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import type { HttpTypes } from '@medusajs/types';

import { Footer } from '../components/footer';
import { Header } from '../components/header';

export interface ComponentDefinition {
  name: string;
  component: ComponentType<any>;
  getData: (ctx: StorefrontContext) => Promise<any>;
  elementTag: string;
  dataVariable: string;
}

export const COMPONENT_REGISTRY: ComponentDefinition[] = [
  {
    name: 'header',
    component: Header,
    getData: async (ctx: StorefrontContext) => {
      const [{ sdk }, { normalizeRegion }, { medusaError }] = await Promise.all(
        [
          import('@gfed-medusa/sf-lib-common/lib/config/medusa'),
          import('@gfed-medusa/sf-lib-common/lib/utils/normalize-functions'),
          import('@gfed-medusa/sf-lib-common/lib/utils/medusa-error'),
        ]
      );

      const regions = await sdk.client
        .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
          method: 'GET',
          cache: 'force-cache',
        })
        .then(({ regions }) => regions.map(normalizeRegion))
        .catch(medusaError);

      return { regions: regions ?? [], ctx };
    },
    elementTag: 'mfe-header',
    dataVariable: '__HEADER_DATA__',
  },
  {
    name: 'footer',
    component: Footer,
    getData: async (ctx: StorefrontContext) => {
      const [
        { createServerApolloClient, graphqlFetch },
        { GET_COLLECTIONS_QUERY },
        { GET_PRODUCT_CATEGORIES_QUERY },
        { GET_FOOTER_QUERY },
      ] = await Promise.all([
        import('@gfed-medusa/sf-lib-common/lib/gql/apollo-client'),
        import('@gfed-medusa/sf-lib-common/lib/gql/queries/collections'),
        import('@gfed-medusa/sf-lib-common/lib/gql/queries/product'),
        import('@gfed-medusa/sf-lib-common/lib/gql/queries/footer'),
      ]);

      const apolloClient = createServerApolloClient(ctx.cookieHeader);

      const [collectionsResult, categoriesResult, footerResult] =
        await Promise.all([
          graphqlFetch<any, any>(
            {
              query: GET_COLLECTIONS_QUERY,
              variables: { limit: 100, offset: 0 },
            },
            apolloClient
          ).catch(() => ({ collections: [] })),
          graphqlFetch<any, any>(
            { query: GET_PRODUCT_CATEGORIES_QUERY },
            apolloClient
          ).catch(() => ({ productCategories: [] })),
          graphqlFetch<any, any>(
            { query: GET_FOOTER_QUERY },
            apolloClient
          ).catch(() => ({ footer: null })),
        ]);

      return {
        collections: collectionsResult?.collections ?? [],
        productCategories: categoriesResult?.productCategories ?? [],
        footerContent: footerResult?.footer,
        ctx,
      };
    },
    elementTag: 'mfe-footer',
    dataVariable: '__FOOTER_DATA__',
  },
];

export function getComponent(name: string): ComponentDefinition | undefined {
  return COMPONENT_REGISTRY.find((c) => c.name === name);
}

export function getComponentNames(): string[] {
  return COMPONENT_REGISTRY.map((c) => c.name);
}

import type { ComponentType } from 'react';
import { Nav } from '@gfed-medusa/sf-lib-common/components/nav';
import { Footer } from '@gfed-medusa/sf-lib-common/components/footer';
import type { HttpTypes } from '@medusajs/types';

export interface ComponentDefinition {
  name: string;
  component: ComponentType<any>;
  getData: () => Promise<any>;
  elementTag: string;
  dataVariable: string;
}

export const COMPONENT_REGISTRY: ComponentDefinition[] = [
  {
    name: 'header',
    component: Nav,
    getData: async () => {
      const { sdk } = await import('@gfed-medusa/sf-lib-common/lib/config/medusa');
      const { normalizeRegion } = await import('@gfed-medusa/sf-lib-common/lib/utils/normalize-functions');
      const { medusaError } = await import('@gfed-medusa/sf-lib-common/lib/utils/medusa-error');
      
      const regions = await sdk.client
        .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
          method: 'GET',
          cache: 'force-cache',
        })
        .then(({ regions }) => regions.map(normalizeRegion))
        .catch(medusaError);

      return { regions: regions ?? [] };
    },
    elementTag: 'mfe-header',
    dataVariable: '__HEADER_DATA__',
  },
  {
    name: 'footer',
    component: Footer,
    getData: async () => {
      const { createServerApolloClient, graphqlFetch } = await import('@gfed-medusa/sf-lib-common/lib/gql/apollo-client');
      const { GET_COLLECTIONS_QUERY } = await import('@gfed-medusa/sf-lib-common/lib/gql/queries/collections');
      const { GET_PRODUCT_CATEGORIES_QUERY } = await import('@gfed-medusa/sf-lib-common/lib/gql/queries/product');
      const { GET_FOOTER_QUERY } = await import('@gfed-medusa/sf-lib-common/lib/gql/queries/footer');
      
      const apolloClient = createServerApolloClient();
      
      const [collectionsResult, categoriesResult, footerResult] = await Promise.all([
        graphqlFetch<any, any>(
          { query: GET_COLLECTIONS_QUERY, variables: { limit: 100, offset: 0 } },
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
      };
    },
    elementTag: 'mfe-footer',
    dataVariable: '__FOOTER_DATA__',
  },
];

export function getComponent(name: string): ComponentDefinition | undefined {
  return COMPONENT_REGISTRY.find(c => c.name === name);
}

export function getComponentNames(): string[] {
  return COMPONENT_REGISTRY.map(c => c.name);
}


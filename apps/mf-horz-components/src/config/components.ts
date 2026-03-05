/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';

import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import type {
  Collection,
  GetFooterDataQuery,
  GetFooterDataQueryVariables,
} from '@gfed-medusa/sf-lib-common/types/graphql';

import { Footer } from '../components/footer';
import { Header } from '../components/header';

export interface ComponentDefinition {
  name: string;
  component: ComponentType<any>;
  getData: (ctx?: StorefrontContext) => Promise<any>;
  elementTag: string;
  dataVariable: string;
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
      const data = await graphqlFetch<any, any>(
        { query: LIST_REGIONS_QUERY },
        apolloClient
      ).catch(() => null);

      return {
        regions: data?.regions ?? [],
      };
    },
    elementTag: 'mfe-header',
    dataVariable: '__HEADER_DATA__',
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
          variables: { collectionLimit: 45, categoryLimit: 4 },
        },
        apolloClient
      ).catch(() => ({ collections: [], productCategories: [], footer: null }));

      const footerCollections: Collection[] = result?.collections ?? [];
      const collections = [...footerCollections]
        .filter((collection) => (collection.products?.count ?? 0) >= 3)
        .sort(
          (left, right) =>
            (right.products?.count ?? 0) - (left.products?.count ?? 0)
        )
        .slice(0, 6);

      return {
        collections: collections ?? [],
        productCategories: result?.productCategories ?? [],
        footerContent: result?.footer,
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

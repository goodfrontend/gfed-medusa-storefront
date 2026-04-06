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
];

export function getComponent(name: string): ComponentDefinition | undefined {
  return COMPONENT_REGISTRY.find((c) => c.name === name);
}

export function getComponentNames(): string[] {
  return COMPONENT_REGISTRY.map((c) => c.name);
}

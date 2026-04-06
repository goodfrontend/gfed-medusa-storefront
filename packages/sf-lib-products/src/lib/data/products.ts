'use server';

import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import {
  createServerApolloClient,
  graphqlFetch,
} from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import type { Region } from '@gfed-medusa/sf-lib-common/types/graphql';

import {
  BROWSE_PRODUCTS_QUERY,
  GET_PRODUCTS_PREVIEW_QUERY,
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_PRICING_QUERY,
} from '@/lib/gql/queries/product';
import type { PricingProduct, SortOptions } from '@/types';
import { BrowseProductsSort } from '@/types/graphql';
import type {
  BrowseProductHitFragment,
  BrowseProductsQuery,
  BrowseProductsQueryVariables,
  GetProductPricingQuery,
  GetProductPricingQueryVariables,
  GetProductsQuery,
  GetProductsQueryVariables,
  Product,
} from '@/types/graphql';

import { getRegion, retrieveRegion } from './regions';

export type BrowseProductsListItem = BrowseProductHitFragment;

export type BrowseProductsListParams = {
  limit?: number;
  collection_id?: string[];
  category_id?: string[];
  id?: string[];
};

const BROWSE_SORT_BY: Record<SortOptions, BrowseProductsSort> = {
  created_at: BrowseProductsSort.Latest,
  price_asc: BrowseProductsSort.PriceAsc,
  price_desc: BrowseProductsSort.PriceDesc,
};

const buildFacetFilter = (attribute: string, values?: string[]) => {
  if (!values?.length) {
    return null;
  }

  if (values.length === 1) {
    return `${attribute}:${values[0]}`;
  }

  return `(${values.map((value) => `${attribute}:${value}`).join(' OR ')})`;
};

const buildBrowseFilters = (queryParams?: BrowseProductsListParams) => {
  if (!queryParams) {
    return undefined;
  }

  const filters = [
    buildFacetFilter('collection_id', queryParams.collection_id),
    buildFacetFilter('category_ids', queryParams.category_id),
    buildFacetFilter('id', queryParams.id),
  ].filter(Boolean);

  return filters.length ? filters.join(' AND ') : undefined;
};

export const listProducts = async (
  {
    countryCode,
    regionId,
    queryParams,
  }: {
    pageParam?: number;
    queryParams?: GetProductsQueryVariables;
    countryCode?: string;
    regionId?: string;
  },
  ctx: StorefrontContext
): Promise<{
  response: {
    products: GetProductsQuery['products']['products'] | [];
    count: number;
  };
  nextPage: number | null;
  queryParams?: GetProductsQueryVariables;
}> => {
  if (!countryCode && !regionId) {
    throw new Error('Country code or region ID is required');
  }

  let region: Region | undefined | null;

  if (countryCode) {
    region = await getRegion(countryCode, ctx);
  } else {
    region = await retrieveRegion(regionId!, ctx);
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  const variables: GetProductsQueryVariables = {
    region_id: region.id,
    ...queryParams,
  };

  try {
    const data = await graphqlFetch<
      GetProductsQuery,
      GetProductsQueryVariables
    >({
      query: GET_PRODUCTS_QUERY,
      variables,
    });

    return {
      response: {
        products: data?.products?.products ?? [],
        count: data?.products?.count || 0,
      },
      nextPage: null,
    };
  } catch (error) {
    console.error('Error fetching products from BFF:', error);
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }
};

export const listProductsPreview = async (
  {
    countryCode,
    regionId,
    queryParams,
  }: {
    pageParam?: number;
    queryParams?: GetProductsQueryVariables;
    countryCode?: string;
    regionId?: string;
  },
  ctx: StorefrontContext
): Promise<{
  response: {
    products: Product[] | [];
    count: number;
  };
  nextPage: number | null;
  queryParams?: GetProductsQueryVariables;
}> => {
  if (!countryCode && !regionId) {
    throw new Error('Country code or region ID is required');
  }

  let region: Region | undefined | null;

  if (countryCode) {
    region = await getRegion(countryCode, ctx);
  } else {
    region = await retrieveRegion(regionId!, ctx);
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  const variables: GetProductsQueryVariables = {
    region_id: region.id,
    ...queryParams,
  };

  try {
    const data = await graphqlFetch<
      { products: { products?: Product[] | null; count: number } },
      GetProductsQueryVariables
    >({
      query: GET_PRODUCTS_PREVIEW_QUERY,
      variables,
    });

    return {
      response: {
        products: data?.products?.products ?? [],
        count: data?.products?.count || 0,
      },
      nextPage: null,
    };
  } catch (error) {
    console.error('Error fetching products preview from BFF:', error);
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }
};

export const retrieveProductPricing = async (
  {
    id,
    regionId,
  }: {
    id: string;
    regionId: string;
  },
  ctx: StorefrontContext
): Promise<PricingProduct | null> => {
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');

  try {
    const data = await graphqlFetch<
      GetProductPricingQuery,
      GetProductPricingQueryVariables
    >(
      {
        query: GET_PRODUCT_PRICING_QUERY,
        variables: {
          id,
          region_id: regionId,
        },
      },
      apolloClient
    );

    return data?.product ?? null;
  } catch (error) {
    console.error('Error fetching product pricing from BFF:', error);
    return null;
  }
};

export const listProductsWithSort = async (
  {
    page = 0,
    queryParams,
    sortBy = 'created_at',
    countryCode,
  }: {
    page?: number;
    queryParams?: BrowseProductsListParams;
    sortBy?: SortOptions;
    countryCode: string;
  },
  ctx: StorefrontContext
): Promise<{
  response: { products: BrowseProductsListItem[]; count: number };
  nextPage: number | null;
  queryParams?: BrowseProductsListParams;
}> => {
  const limit = queryParams?.limit || 12;
  const zeroBasedPage = Math.max(page - 1, 0);
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');

  try {
    const data = await graphqlFetch<
      BrowseProductsQuery,
      BrowseProductsQueryVariables
    >(
      {
        query: BROWSE_PRODUCTS_QUERY,
        variables: {
          countryCode,
          sort: BROWSE_SORT_BY[sortBy],
          hitsPerPage: limit,
          page: zeroBasedPage,
          filters: buildBrowseFilters(queryParams),
        },
      },
      apolloClient
    );

    const count = data?.browseProducts?.total ?? 0;
    const totalPages = data?.browseProducts?.totalPages ?? 0;

    return {
      response: {
        products: data?.browseProducts?.items ?? [],
        count,
      },
      nextPage: zeroBasedPage + 1 < totalPages ? zeroBasedPage + 1 : null,
      queryParams,
    };
  } catch (error) {
    console.error('Error fetching browse products from BFF:', error);

    return {
      response: { products: [], count: 0 },
      nextPage: null,
      queryParams,
    };
  }
};

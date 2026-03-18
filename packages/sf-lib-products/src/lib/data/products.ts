'use server';

import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import {
  createServerApolloClient,
  graphqlFetch,
} from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import type { Region } from '@gfed-medusa/sf-lib-common/types/graphql';

import {
  GET_PRODUCT_PRICING_QUERY,
  GET_PRODUCTS_PREVIEW_QUERY,
  GET_PRODUCTS_QUERY,
} from '@/lib/gql/queries/product';
import { sortProducts } from '@/lib/utils/sort-products';
import type { PricingProduct, SortOptions } from '@/types';
import type {
  GetProductPricingQuery,
  GetProductPricingQueryVariables,
  GetProductsQuery,
  GetProductsQueryVariables,
  Product,
} from '@/types/graphql';

import { getRegion, retrieveRegion } from './regions';

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

/**
 * Price sorting is still handled locally, so it fetches a larger result set and
 * slices it after sorting. For the default created_at sort, fetch only the
 * requested page to avoid downloading unused products.
 */
export const listProductsWithSort = async (
  {
    page = 0,
    queryParams,
    sortBy = 'created_at',
    countryCode,
  }: {
    page?: number;
    queryParams?: GetProductsQueryVariables;
    sortBy?: SortOptions;
    countryCode: string;
  },
  ctx: StorefrontContext
): Promise<{
  response: { products: Product[]; count: number };
  nextPage: number | null;
  queryParams?: GetProductsQueryVariables;
}> => {
  const limit = queryParams?.limit || 12;
  const pageParam = Math.max(page - 1, 0) * limit;

  if (sortBy === 'created_at') {
    const {
      response: { products, count },
    } = await listProductsPreview(
      {
        queryParams: {
          ...queryParams,
          limit,
          offset: pageParam,
        },
        countryCode,
      },
      ctx
    );

    const nextPage = count > pageParam + limit ? pageParam + limit : null;

    return {
      response: {
        products: products ?? [],
        count,
      },
      nextPage,
      queryParams: {
        ...queryParams,
        limit,
        offset: pageParam,
      },
    };
  }

  const {
    response: { products: rawProducts, count },
  } = await listProductsPreview(
    {
      pageParam: 0,
      queryParams: {
        ...queryParams,
        limit: 100,
      },
      countryCode,
    },
    ctx
  );

  const products = rawProducts ?? [];
  const sortedProducts = sortProducts(products as Product[], sortBy);

  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
};

'use server';

import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { graphqlFetch } from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import type { Region } from '@gfed-medusa/sf-lib-common/types/graphql';

import { GET_PRODUCTS_QUERY } from '@/lib/gql/queries/product';
import { sortProducts } from '@/lib/utils/sort-products';
import type { SortOptions } from '@/types';
import type {
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

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
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

  const {
    response: { products: rawProducts, count },
  } = await listProducts(
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

  const pageParam = (page - 1) * limit;

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

'use server';

import { unstable_cache } from 'next/cache';

import { type SearchClient, algoliasearch } from 'algoliasearch';

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

type DirectAlgoliaBrowseHit = {
  objectID?: string;
  id?: string;
  title?: string | null;
  handle?: string | null;
  thumbnail?: string | null;
  price_amount?: number | null;
  original_price_amount?: number | null;
  currency_code?: string | null;
};

type DirectAlgoliaBrowseResponse = {
  nbHits?: number;
  nbPages?: number;
  hits?: DirectAlgoliaBrowseHit[];
};

const BROWSE_SORT_BY: Record<SortOptions, BrowseProductsSort> = {
  created_at: BrowseProductsSort.Latest,
  price_asc: BrowseProductsSort.PriceAsc,
  price_desc: BrowseProductsSort.PriceDesc,
};

const DIRECT_ALGOLIA_SORT_SUFFIX: Record<SortOptions, string> = {
  created_at: '',
  price_asc: '_price_asc',
  price_desc: '_price_desc',
};

const DIRECT_ALGOLIA_ATTRIBUTES_TO_RETRIEVE = [
  'id',
  'title',
  'handle',
  'thumbnail',
  'price_amount',
  'original_price_amount',
  'currency_code',
];

const DIRECT_ALGOLIA_PLP_REVALIDATE_SECONDS = 30;

const isTruthyFlag = (value?: string) =>
  ['1', 'true', 'yes', 'on'].includes(value?.trim().toLowerCase() ?? '');

const shouldUseDirectAlgoliaPlp = () =>
  isTruthyFlag(process.env.USE_DIRECT_ALGOLIA_PLP);

const sanitizeAlgoliaMarketKey = (marketKey: string) =>
  marketKey.replace(/[^a-zA-Z0-9_-]/g, '_');

type DirectAlgoliaBrowseConfig = {
  appId: string;
  apiKey: string;
  browseIndexBaseName: string;
};

let directAlgoliaBrowseConfigCache: DirectAlgoliaBrowseConfig | null = null;
let directAlgoliaBrowseClientCache: SearchClient | null = null;
let directAlgoliaBrowseClientKey: string | null = null;

const resolveAlgoliaBrowseConfig = () => {
  if (directAlgoliaBrowseConfigCache) {
    return directAlgoliaBrowseConfigCache;
  }

  const appId = process.env.ALGOLIA_APP_ID;
  const apiKey = process.env.ALGOLIA_SEARCH_KEY;
  const browseIndexBaseName =
    process.env.ALGOLIA_PRODUCT_BROWSE_INDEX_NAME ??
    (process.env.ALGOLIA_PRODUCT_INDEX_NAME
      ? `${process.env.ALGOLIA_PRODUCT_INDEX_NAME}_browse`
      : undefined);

  if (!appId || !apiKey || !browseIndexBaseName) {
    throw new Error(
      'Missing Algolia PLP configuration. Set ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, and ALGOLIA_PRODUCT_INDEX_NAME or ALGOLIA_PRODUCT_BROWSE_INDEX_NAME.'
    );
  }

  directAlgoliaBrowseConfigCache = {
    appId,
    apiKey,
    browseIndexBaseName,
  };

  return directAlgoliaBrowseConfigCache;
};

const getDirectAlgoliaBrowseClient = () => {
  const { appId, apiKey } = resolveAlgoliaBrowseConfig();
  const clientKey = `${appId}:${apiKey}`;

  if (
    !directAlgoliaBrowseClientCache ||
    directAlgoliaBrowseClientKey !== clientKey
  ) {
    directAlgoliaBrowseClientCache = algoliasearch(appId, apiKey);
    directAlgoliaBrowseClientKey = clientKey;
  }

  return directAlgoliaBrowseClientCache;
};

const getDirectAlgoliaBrowseIndexName = (
  browseIndexBaseName: string,
  regionId: string,
  sortBy: SortOptions
) =>
  `${browseIndexBaseName}_${sanitizeAlgoliaMarketKey(regionId)}${
    DIRECT_ALGOLIA_SORT_SUFFIX[sortBy]
  }`;

const mapDirectAlgoliaHit = (
  hit: DirectAlgoliaBrowseHit
): BrowseProductsListItem | null => {
  const id = hit.id ?? hit.objectID;
  const handle = hit.handle?.trim();

  if (!id || !handle) {
    return null;
  }

  return {
    __typename: 'BrowseProductHit',
    id,
    title: hit.title ?? null,
    handle,
    thumbnail: hit.thumbnail ?? null,
    priceAmount: hit.price_amount ?? null,
    originalPriceAmount: hit.original_price_amount ?? null,
    currencyCode: hit.currency_code ?? null,
  };
};

const fetchDirectAlgoliaBrowseProductsUncached = async ({
  regionId,
  sortBy,
  limit,
  page,
  filters,
}: {
  regionId: string;
  sortBy: SortOptions;
  limit: number;
  page: number;
  filters?: string;
}): Promise<{
  products: BrowseProductsListItem[];
  total: number;
  totalPages: number;
}> => {
  const { browseIndexBaseName } = resolveAlgoliaBrowseConfig();
  const client = getDirectAlgoliaBrowseClient();
  const indexName = getDirectAlgoliaBrowseIndexName(
    browseIndexBaseName,
    regionId,
    sortBy
  );

  const data = (await client.searchSingleIndex<DirectAlgoliaBrowseHit>({
    indexName,
    searchParams: {
      query: '',
      hitsPerPage: limit,
      page,
      attributesToRetrieve: DIRECT_ALGOLIA_ATTRIBUTES_TO_RETRIEVE,
      ...(filters && { filters }),
    },
  })) as DirectAlgoliaBrowseResponse;
  const products = (data.hits ?? [])
    .map(mapDirectAlgoliaHit)
    .filter((hit): hit is BrowseProductsListItem => Boolean(hit));

  return {
    products,
    total: data.nbHits ?? 0,
    totalPages: data.nbPages ?? 0,
  };
};

const fetchDirectAlgoliaBrowseProductsCached = unstable_cache(
  async (
    regionId: string,
    sortBy: SortOptions,
    limit: number,
    page: number,
    filters: string | null
  ) =>
    fetchDirectAlgoliaBrowseProductsUncached({
      regionId,
      sortBy,
      limit,
      page,
      filters: filters ?? undefined,
    }),
  ['direct-algolia-plp'],
  { revalidate: DIRECT_ALGOLIA_PLP_REVALIDATE_SECONDS }
);

const fetchDirectAlgoliaBrowseProducts = async ({
  regionId,
  sortBy,
  limit,
  page,
  filters,
}: {
  regionId: string;
  sortBy: SortOptions;
  limit: number;
  page: number;
  filters?: string;
}) =>
  fetchDirectAlgoliaBrowseProductsCached(
    regionId,
    sortBy,
    limit,
    page,
    filters ?? null
  );

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
  const region = await getRegion(countryCode, ctx).catch(() => null);
  const filters = buildBrowseFilters(queryParams);

  if (shouldUseDirectAlgoliaPlp()) {
    if (!region?.id) {
      return {
        response: { products: [], count: 0 },
        nextPage: null,
        queryParams,
      };
    }

    try {
      const data = await fetchDirectAlgoliaBrowseProducts({
        regionId: region.id,
        sortBy,
        limit,
        page: zeroBasedPage,
        filters,
      });

      return {
        response: {
          products: data.products,
          count: data.total,
        },
        nextPage:
          zeroBasedPage + 1 < data.totalPages ? zeroBasedPage + 1 : null,
        queryParams,
      };
    } catch (error) {
      console.error('Error fetching browse products from Algolia:', error);

      return {
        response: { products: [], count: 0 },
        nextPage: null,
        queryParams,
      };
    }
  }

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
          regionId: region?.id,
          sort: BROWSE_SORT_BY[sortBy],
          hitsPerPage: limit,
          page: zeroBasedPage,
          filters,
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

import { NextRequest, NextResponse } from 'next/server';

import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import {
  type BrowseProductsListParams,
  listProductsWithSort,
} from '@gfed-medusa/sf-lib-products/lib/data/products';
import type { SortOptions } from '@gfed-medusa/sf-lib-products/types/index';

const PRODUCT_LIMIT = 12;

const normalizePage = (page?: string | null) => {
  const parsedPage = Number.parseInt(page ?? '1', 10);

  return Number.isFinite(parsedPage) ? Math.max(parsedPage, 1) : 1;
};

const normalizeCount = (value?: string | null) => {
  const parsedValue = Number.parseInt(value ?? '0', 10);

  return Number.isFinite(parsedValue) ? Math.max(parsedValue, 0) : 0;
};

const normalizeSort = (sortBy?: string | null): SortOptions => {
  if (
    sortBy === 'created_at' ||
    sortBy === 'price_asc' ||
    sortBy === 'price_desc'
  ) {
    return sortBy;
  }

  return 'created_at';
};

const buildQueryParams = ({
  collectionId,
  categoryId,
  productIds,
  limit = PRODUCT_LIMIT,
}: {
  collectionId?: string | null;
  categoryId?: string | null;
  productIds: string[];
  limit?: number;
}): BrowseProductsListParams => {
  const queryParams: BrowseProductsListParams = {
    limit,
  };

  if (collectionId) {
    queryParams.collection_id = [collectionId];
  }

  if (categoryId) {
    queryParams.category_id = [categoryId];
  }

  if (productIds.length > 0) {
    queryParams.id = productIds;
  }

  return queryParams;
};

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const countryCode = searchParams.get('countryCode');

  if (!countryCode) {
    return NextResponse.json(
      { error: 'Missing countryCode parameter' },
      { status: 400 }
    );
  }

  const page = normalizePage(searchParams.get('page'));
  const targetPage = normalizePage(searchParams.get('targetPage'));
  const excludeLoadedCount = normalizeCount(
    searchParams.get('excludeLoadedCount')
  );
  const isHydrationRequest = searchParams.has('targetPage');
  const sortBy = normalizeSort(searchParams.get('sortBy'));
  const queryParams = buildQueryParams({
    collectionId: searchParams.get('collectionId'),
    categoryId: searchParams.get('categoryId'),
    productIds: searchParams.getAll('productId'),
    limit: isHydrationRequest ? PRODUCT_LIMIT * targetPage : PRODUCT_LIMIT,
  });

  const ctx: StorefrontContext = {
    cartId: '',
    cacheId: '',
    cookieHeader: req.headers.get('cookie') ?? '',
  };

  const {
    response: { products, count },
  } = await listProductsWithSort(
    {
      page: isHydrationRequest ? 1 : page,
      queryParams,
      sortBy,
      countryCode,
    },
    ctx
  );

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);
  const resolvedPage = isHydrationRequest ? Math.min(targetPage, totalPages) : page;
  const responseProducts = isHydrationRequest
    ? products.slice(excludeLoadedCount)
    : products;

  return NextResponse.json({
    products: responseProducts,
    count,
    page: resolvedPage,
    totalPages,
    hasNextPage: resolvedPage < totalPages,
  });
}

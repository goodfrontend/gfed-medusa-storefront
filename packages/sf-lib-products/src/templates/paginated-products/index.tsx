import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';

import { SortOptions } from '@/components/refinement-list/sort-products';
import {
  type BrowseProductsListParams,
  listProductsWithSort,
} from '@/lib/data/products';

import PaginatedProductsClient from './client';

const PRODUCT_LIMIT = 12;

const normalizePage = (page?: number | string) => {
  const parsedPage =
    typeof page === 'number' ? page : Number.parseInt(page ?? '1', 10);

  return Number.isFinite(parsedPage) ? Math.max(parsedPage, 1) : 1;
};

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions;
  page?: number | string;
  collectionId?: string;
  categoryId?: string;
  productsIds?: string[];
  countryCode: string;
}) {
  const ctx = await resolveNextContext();
  const requestedPage = normalizePage(page);
  const queryParams: BrowseProductsListParams = {
    limit: PRODUCT_LIMIT,
  };

  if (collectionId) {
    queryParams['collection_id'] = [collectionId];
  }

  if (categoryId) {
    queryParams['category_id'] = [categoryId];
  }

  if (productsIds) {
    queryParams['id'] = productsIds;
  }

  const {
    response: { products, count },
  } = await listProductsWithSort(
    {
      page: 1,
      queryParams,
      sortBy,
      countryCode,
    },
    ctx
  );

  return (
    <PaginatedProductsClient
      key={[
        countryCode,
        sortBy ?? 'created_at',
        collectionId ?? '',
        categoryId ?? '',
        productsIds?.join(',') ?? '',
        requestedPage,
      ].join(':')}
      initialProducts={products}
      initialTotalItems={count}
      initialTargetPage={requestedPage}
      itemsPerPage={PRODUCT_LIMIT}
      sortBy={sortBy}
      collectionId={collectionId}
      categoryId={categoryId}
      productsIds={productsIds}
      countryCode={countryCode}
    />
  );
}

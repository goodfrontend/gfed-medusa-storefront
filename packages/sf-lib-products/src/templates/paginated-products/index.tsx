import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';

import { BrowseProductPreview } from '@/components/browse-product-preview';
import { Pagination } from '@/components/pagination';
import { SortOptions } from '@/components/refinement-list/sort-products';
import {
  type BrowseProductsListParams,
  listProductsWithSort,
} from '@/lib/data/products';

const PRODUCT_LIMIT = 12;
const LCP_CANDIDATE_COUNT = 4;

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions;
  page: number;
  collectionId?: string;
  categoryId?: string;
  productsIds?: string[];
  countryCode: string;
}) {
  const ctx = await resolveNextContext();
  const queryParams: BrowseProductsListParams = {
    limit: 12,
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
      page,
      queryParams,
      sortBy,
      countryCode,
    },
    ctx
  );

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  return (
    <>
      <ul
        className="small:grid-cols-3 medium:grid-cols-4 grid w-full grid-cols-2 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p, index) => {
          const isLcpCandidate = index < LCP_CANDIDATE_COUNT;

          return (
            <li key={p.id}>
              <BrowseProductPreview
                product={p}
                imagePriority={isLcpCandidate}
                imageFetchPriority={isLcpCandidate ? 'high' : undefined}
              />
            </li>
          );
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

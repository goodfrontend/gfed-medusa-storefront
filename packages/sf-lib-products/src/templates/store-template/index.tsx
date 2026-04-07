import { Suspense } from 'react';

import RefinementList from '@/components/refinement-list';
import { SortOptions } from '@/components/refinement-list/sort-products';
import SkeletonProductGrid from '@/components/skeleton-product-grid';

import PaginatedProducts from '../paginated-products';

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions;
  page?: string;
  countryCode: string;
}) => {
  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || 'created_at';

  return (
    <div
      className="content-container small:grid-cols-[250px_minmax(0,1fr)] small:gap-x-6 small:gap-y-0 grid grid-cols-1 gap-y-6 py-6"
      data-testid="category-container"
    >
      <div className="small:contents flex flex-wrap items-center justify-between gap-x-8 gap-y-8">
        <div className="text-2xl-semi small:col-start-2 small:mb-8 min-w-[16rem] flex-1">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <RefinementList
          className="small:col-start-1 small:row-span-2 small:row-start-1 small:self-start small:w-full w-auto shrink-0"
          sortBy={sort}
        />
      </div>
      <div className="small:col-start-2 w-full">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default StoreTemplate;

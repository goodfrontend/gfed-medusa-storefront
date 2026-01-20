import { Suspense } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import RefinementList from '@gfed-medusa/sf-lib-products/components/refinement-list';
import SkeletonProductGrid from '@gfed-medusa/sf-lib-products/components/skeleton-product-grid';
import { getCollectionByHandle } from '@gfed-medusa/sf-lib-products/lib/data/collections';
import PaginatedProducts from '@gfed-medusa/sf-lib-products/templates/paginated-products';
import type { SortOptions } from '@gfed-medusa/sf-lib-products/types/index';

type Props = {
  params: Promise<{ handle: string; countryCode: string }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: SortOptions;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    notFound();
  }

  const metadata = {
    title: `${collection.title} | Medusa Store`,
    description: `${collection.title} collection`,
  } as Metadata;

  return metadata;
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sortBy, page } = searchParams;

  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    notFound();
  }

  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || 'created_at';

  return (
    <div
      className="content-container small:flex-row small:items-start flex flex-col py-6"
      data-testid="collection-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1 data-testid="collection-page-title">{collection.title}</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={params.countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
}

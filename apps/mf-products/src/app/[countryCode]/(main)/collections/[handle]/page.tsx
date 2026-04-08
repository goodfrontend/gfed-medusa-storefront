import { Suspense, cache } from 'react';

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

const getCollectionByHandleCached = cache(async (handle: string) => {
  return getCollectionByHandle(handle);
});

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollectionByHandleCached(params.handle);

  if (!collection) {
    notFound();
  }

  return {
    title: collection.title,
    description: `Shop the ${collection.title} collection at JustGood Store.`,
    openGraph: {
      title: `${collection.title} | JustGood Store`,
      description: `Shop the ${collection.title} collection at JustGood Store.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${collection.title} | JustGood Store`,
      description: `Shop the ${collection.title} collection at JustGood Store.`,
    },
  };
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sortBy, page } = searchParams;

  const collection = await getCollectionByHandleCached(params.handle);

  if (!collection) {
    notFound();
  }

  const sort = sortBy || 'created_at';

  return (
    <div
      className="content-container small:grid-cols-[250px_minmax(0,1fr)] small:gap-x-6 small:gap-y-0 grid grid-cols-1 gap-y-6 py-6"
      data-testid="collection-container"
    >
      <div className="small:contents flex flex-wrap items-center justify-between gap-x-8 gap-y-8">
        <div className="text-2xl-semi small:col-start-2 small:mb-8 min-w-[16rem] flex-1">
          <h1 data-testid="collection-page-title">{collection.title}</h1>
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
            page={page}
            collectionId={collection.id}
            countryCode={params.countryCode}
          />
        </Suspense>
      </div>
    </div>
  );
}

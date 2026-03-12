import { Metadata } from 'next';
import { Suspense } from 'react';

import { listCollections } from '@gfed-medusa/sf-lib-common/lib/data/collections';
import { Collection } from '@gfed-medusa/sf-lib-common/types/graphql';
import { FeaturedProducts } from '@gfed-medusa/sf-lib-home/components/featured-products';
import { Hero } from '@gfed-medusa/sf-lib-home/components/hero';

export const metadata: Metadata = {
  title: 'Medusa Next.js Starter Template',
  description:
    'A performant frontend ecommerce starter template with Next.js 15 and Medusa.',
};

function FeaturedCollectionsSkeleton() {
  return (
    <div className="py-10" aria-hidden="true">
      <ul className="flex flex-col gap-x-6">
        {Array.from({ length: 2 }, (_, railIndex) => (
          <li key={`skeleton-rail-${railIndex}`}>
            <div className="content-container small:py-24 py-12">
              <div className="mb-8 flex justify-between">
                <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
                <div className="h-5 w-20 animate-pulse rounded-md bg-gray-200" />
              </div>
              <ul className="small:grid-cols-3 small:gap-y-36 lg:grid-cols-3 lg:gap-y-36 grid grid-cols-2 gap-x-6 gap-y-24">
                {Array.from({ length: 3 }, (_, cardIndex) => (
                  <li key={`skeleton-card-${railIndex}-${cardIndex}`}>
                    <div>
                      <div className="rounded-large bg-ui-bg-subtle shadow-elevation-card-rest relative aspect-[11/14] w-full overflow-hidden p-4">
                        <div className="bg-ui-bg-base h-full w-full animate-pulse rounded" />
                      </div>
                      <div className="mt-4 flex justify-between gap-x-2">
                        <div className="h-5 w-2/3 animate-pulse rounded-md bg-gray-200" />
                        <div className="h-5 w-12 animate-pulse rounded-md bg-gray-200" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function FeaturedCollections() {
  const { collections } = await listCollections({ limit: '6' });

  if (!collections || collections.length === 0) {
    return (
      <div className="py-10">
        <p className="text-ui-fg-subtle text-center">
          No featured collections available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <ul className="flex flex-col gap-x-6">
        <FeaturedProducts collections={collections as Collection[]} />
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<FeaturedCollectionsSkeleton />}>
        <FeaturedCollections />
      </Suspense>
    </>
  );
}

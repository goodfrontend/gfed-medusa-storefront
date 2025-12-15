import { Metadata } from 'next';

import { listCollections } from '@gfed-medusa/sf-lib-common/lib/data/collections';
import { Collection } from '@gfed-medusa/sf-lib-common/types/graphql';
import { FeaturedProducts } from '@gfed-medusa/sf-lib-home/components/featured-products';
import { Hero } from '@gfed-medusa/sf-lib-home/components/hero';

export const metadata: Metadata = {
  title: 'Medusa Next.js Starter Template',
  description:
    'A performant frontend ecommerce starter template with Next.js 15 and Medusa.',
};

export default async function Home() {
  const { collections } = await listCollections();

  if (!collections) {
    return null;
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections as Collection[]} />
        </ul>
      </div>
    </>
  );
}

import { Metadata } from 'next';

import StoreTemplate from '@gfed-medusa/sf-lib-products/templates/store-template';
import type { SortOptions } from '@gfed-medusa/sf-lib-products/types/index';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Explore all of our products at JustGood Store. Find the best deals and latest arrivals.',
  openGraph: {
    title: 'Store | JustGood Store',
    description: 'Explore all of our products at JustGood Store. Find the best deals and latest arrivals.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Store | JustGood Store',
    description: 'Explore all of our products at JustGood Store. Find the best deals and latest arrivals.',
  },
};

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
  }>;
  params: Promise<{
    countryCode: string;
  }>;
};

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams;

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  );
}

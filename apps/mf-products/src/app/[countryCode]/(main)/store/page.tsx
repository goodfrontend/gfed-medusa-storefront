import { Metadata } from 'next';

import StoreTemplate from '@gfed-medusa/sf-lib-products/templates/store-template';
import type { SortOptions } from '@gfed-medusa/sf-lib-products/types/index';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Explore all of our products.',
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

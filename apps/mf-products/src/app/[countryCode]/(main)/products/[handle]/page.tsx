import { cache } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { graphqlFetch } from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import { getRegion } from '@gfed-medusa/sf-lib-products/lib/data/regions';
import { GET_PRODUCT_CONTENT_BY_HANDLE_QUERY } from '@gfed-medusa/sf-lib-products/lib/gql/queries/product';
import ProductTemplate from '@gfed-medusa/sf-lib-products/templates/product-template';
import type {
  GetProductContentByHandleQuery,
  GetProductContentByHandleQueryVariables,
  Product,
} from '@gfed-medusa/sf-lib-products/types/graphql';

export type Props = {
  params: Promise<{ countryCode: string; handle: string }>;
};

const getRegionForCountry = cache(async (countryCode: string) => {
  const ctx = await resolveNextContext();
  return getRegion(countryCode, ctx);
});

const getProductByHandle = cache(
  async (handle: string, regionId: string): Promise<Product | null> => {
    const data = await graphqlFetch<
      GetProductContentByHandleQuery,
      GetProductContentByHandleQueryVariables
    >({
      query: GET_PRODUCT_CONTENT_BY_HANDLE_QUERY,
      variables: {
        handle,
        region_id: regionId,
        limit: 1,
      },
    });

    const product = data?.products?.products?.[0] ?? null;

    return product as Product | null;
  }
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle, countryCode } = await params;
  const region = await getRegionForCountry(countryCode);

  if (!region) {
    notFound();
  }

  const product = await getProductByHandle(handle, region.id);

  if (!product) {
    notFound();
  }

  return {
    title: `${product.title} | JustGood Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | JustGood Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { countryCode, handle } = await params;
  const region = await getRegionForCountry(countryCode);

  if (!region) {
    notFound();
  }

  const product = await getProductByHandle(handle, region.id);

  if (!product) {
    notFound();
  }

  return (
    <ProductTemplate
      product={product as Product}
      region={region}
      countryCode={countryCode}
    />
  );
}

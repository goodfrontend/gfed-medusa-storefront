import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { graphqlFetch } from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import { getRegion } from '@gfed-medusa/sf-lib-products/lib/data/regions';
import { GET_PRODUCT_CONTENT_BY_HANDLE_QUERY } from '@gfed-medusa/sf-lib-products/lib/gql/queries/product';
import ProductTemplate from '@gfed-medusa/sf-lib-products/templates/product-template';
import type { Product, GetProductContentByHandleQuery, GetProductContentByHandleQueryVariables } from '@gfed-medusa/sf-lib-products/types/graphql';

export type Props = {
  params: Promise<{ countryCode: string; handle: string }>;
};

async function getProductByHandle({
  handle,
  countryCode,
}: {
  handle: string;
  countryCode: string;
}): Promise<Product | null> {
  const ctx = await resolveNextContext();
  const region = await getRegion(countryCode, ctx);

  if (!region) {
    return null;
  }

  const data = await graphqlFetch<GetProductContentByHandleQuery, GetProductContentByHandleQueryVariables>({
    query: GET_PRODUCT_CONTENT_BY_HANDLE_QUERY,
    variables: {
      handle,
      region_id: region.id,
      limit: 1,
    },
  });

  const product = data?.products?.products?.[0] ?? null;

  return product as Product | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle, countryCode } = await params;
  const ctx = await resolveNextContext();
  const region = await getRegion(countryCode, ctx);

  if (!region) {
    notFound();
  }

  const product = await getProductByHandle({ handle, countryCode });

  if (!product) {
    notFound();
  }

  return {
    title: `${product.title} | Medusa Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { countryCode, handle } = await params;
  const ctx = await resolveNextContext();
  const region = await getRegion(countryCode, ctx);

  if (!region) {
    notFound();
  }

  const product = await getProductByHandle({ handle, countryCode });

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

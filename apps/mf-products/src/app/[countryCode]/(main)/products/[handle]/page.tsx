import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { listProducts } from '@gfed-medusa/sf-lib-products/lib/data/products';
import { getRegion } from '@gfed-medusa/sf-lib-products/lib/data/regions';
import ProductTemplate from '@gfed-medusa/sf-lib-products/templates/product-template';
import type { Product } from '@gfed-medusa/sf-lib-products/types/graphql';

export type Props = {
  params: Promise<{ countryCode: string; handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle, countryCode } = await params;
  const region = await getRegion(countryCode);

  if (!region) {
    notFound();
  }

  const product = await listProducts({
    countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products?.[0]);

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
  const region = await getRegion(countryCode);

  if (!region) {
    notFound();
  }

  const pricedProduct = await listProducts({
    countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products?.[0]);

  if (!pricedProduct) {
    notFound();
  }

  return (
    <ProductTemplate
      product={pricedProduct as Product}
      region={region}
      countryCode={countryCode}
    />
  );
}

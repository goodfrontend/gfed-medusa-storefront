import { unstable_noStore as noStore } from 'next/cache';

import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';

import ProductActions from '@/components/product-actions';
import { retrieveProductPricing } from '@/lib/data/products';
import { mergeProductPricing } from '@/lib/utils/merge-product-pricing';
import type { ProductActionsProduct } from '@/types';

/**
 * Reuses page product data and merges in fresh server-side pricing.
 */
export default async function ProductActionsWrapper({
  product,
  region,
}: {
  product: ProductActionsProduct;
  region: Region;
}) {
  noStore();

  const ctx = await resolveNextContext();
  const pricingProduct = await retrieveProductPricing(
    {
      id: product.id,
      regionId: region.id,
    },
    ctx
  );

  return (
    <ProductActions
      product={mergeProductPricing(product, pricingProduct)}
      regionId={region.id}
    />
  );
}

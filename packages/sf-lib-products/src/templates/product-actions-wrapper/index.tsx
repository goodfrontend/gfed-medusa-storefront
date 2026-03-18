import { unstable_noStore as noStore } from 'next/cache';

import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';

import ProductActions from '@/components/product-actions';
import { retrieveProductPricing } from '@/lib/data/products';
import type { ProductActionsProduct, PricingProduct } from '@/types';

const mergeProductPricing = (
  product: ProductActionsProduct,
  pricingProduct: PricingProduct | null
): ProductActionsProduct => {
  const pricingById = new Map(
    (pricingProduct?.variants ?? []).map((variant) => [variant.id, variant] as const)
  );

  return {
    ...product,
    variants: (product.variants ?? []).map((variant) => {
      const pricingVariant = pricingById.get(variant.id);

      return {
        ...variant,
        inventoryQuantity:
          pricingVariant?.inventoryQuantity ?? variant.inventoryQuantity,
        price: pricingVariant?.price ?? variant.price,
        originalPrice: pricingVariant?.originalPrice ?? variant.originalPrice,
      };
    }),
  };
};

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

  return <ProductActions product={mergeProductPricing(product, pricingProduct)} />;
}

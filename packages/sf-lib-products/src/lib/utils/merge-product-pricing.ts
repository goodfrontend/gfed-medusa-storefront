import type { PricingProduct, ProductActionsProduct } from '@/types';

export const mergeProductPricing = (
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

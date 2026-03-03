'use client';

import { getProductPrice } from '@gfed-medusa/sf-lib-common/lib/utils/get-product-price';

import { useProductPrice } from '@/lib/hooks/use-product-price';
import { Product, ProductVariant } from '@/types/graphql';

export default function ProductPrice({
  product,
  variant,
  regionId,
}: {
  product: Product;
  variant?: ProductVariant;
  regionId: string;
}) {
  const { product: pricingProduct } = useProductPrice(product.id, regionId);

  const pricingById = new Map(
    (pricingProduct?.variants ?? []).map((v: any) => [v.id, v])
  );

  const sourceProduct = {
    ...product,
    variants: (product.variants ?? []).map((v: any) => {
      const p = pricingById.get(v.id);
      return {
        ...v,
        price: p?.price,
        originalPrice: p?.originalPrice,
        inventoryQuantity: p?.inventoryQuantity,
      };
    }),
  } as Product;

  const { cheapestPrice, variantPrice } = getProductPrice({
    product: sourceProduct,
    variantId: variant?.id,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="block h-9 w-32 animate-pulse bg-gray-100" />;
  }

  return (
    <div className="flex h-9 w-32 items-center">
      <span
        className="truncate"
        data-testid="product-price"
        data-value={selectedPrice.calculated_price_number}
      >
        {!variant && 'From '}
        {selectedPrice.calculated_price}
      </span>
    </div>
  );
}

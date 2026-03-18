'use client';

import { getProductPrice } from '@gfed-medusa/sf-lib-common/lib/utils/get-product-price';

import { ProductActionsProduct } from '@/types';
import { ProductVariant } from '@/types/graphql';

export default function ProductPrice({
  product,
  variant,
}: {
  product: ProductActionsProduct;
  variant?: ProductVariant;
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
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

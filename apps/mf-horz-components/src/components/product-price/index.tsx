'use client';

import type { VariantPrice } from '@gfed-medusa/sf-lib-common/types/prices';

type Props = {
  cheapestPrice?: VariantPrice | null;
  price?: VariantPrice | null;
  pricesByVariantId?: Record<string, VariantPrice>;
  showFromPrefix?: boolean;
  selectedVariantId?: string;
};

function ProductPrice({
  cheapestPrice,
  price: priceProp,
  pricesByVariantId,
  showFromPrefix,
  selectedVariantId,
}: Props) {
  const selected =
    (selectedVariantId && pricesByVariantId?.[selectedVariantId]) ?? null;

  const price = selected ?? cheapestPrice ?? priceProp ?? null;

  if (!price) {
    return null;
  }

  const originalPrice = price.original_price_number;
  const currentPrice = price.calculated_price_number;
  const hasReducedPrice =
    typeof originalPrice === 'number' &&
    typeof currentPrice === 'number' &&
    currentPrice < originalPrice;

  return (
    <span>
      {hasReducedPrice && (
        <span data-testid="product-original-price">
          {price.original_price}{' '}
        </span>
      )}
      {showFromPrefix && 'From '}
      <span data-testid="product-price">{price.calculated_price}</span>
    </span>
  );
}

export { ProductPrice };

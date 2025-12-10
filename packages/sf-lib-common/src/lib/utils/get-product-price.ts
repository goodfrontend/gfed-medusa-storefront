import { Product } from '@/types/graphql';

import { getPercentageDiff } from './get-percentage-diff';
import { convertToLocale } from './money';

export const getPricesForVariant = (variant: any) => {
  if (!variant?.price?.amount) {
    return null;
  }

  return {
    calculated_price_number: variant.price?.amount,
    calculated_price: convertToLocale({
      amount: variant.price.amount,
      currency_code: variant.price.currencyCode || '',
    }),
    original_price_number:
      variant.originalPrice?.amount || variant.price.amount,
    original_price: convertToLocale({
      amount: variant.originalPrice?.amount || variant.price.amount,
      currency_code: variant.price.currencyCode || '',
    }),
    currency_code: variant.price.currencyCode,
    price_type: variant.price.priceType || 'default',
    percentage_diff: getPercentageDiff(
      variant.originalPrice?.amount || variant.price.amount,
      variant.price.amount
    ),
  };
};

export function getProductPrice({
  product,
  variantId,
}: {
  product: Product;
  variantId?: string;
}) {
  if (!product || !product.id) {
    throw new Error('No product provided');
  }

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null;
    }

    const cheapestVariant: any = product.variants
      .filter((v: any) => !!v.price)
      .sort((a: any, b: any) => {
        return (a.price?.amount ?? 0) - (b.price?.amount ?? 0);
      })[0];

    return getPricesForVariant(cheapestVariant);
  };

  const variantPrice = () => {
    if (!product || !variantId) {
      return null;
    }

    const variant: any = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId
    );

    if (!variant) {
      return null;
    }

    return getPricesForVariant(variant);
  };

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  };
}

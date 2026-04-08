import { LocalizedClientLink } from '@gfed-medusa/sf-lib-common/components/localized-client-link';
import { PreviewPrice } from '@gfed-medusa/sf-lib-common/components/preview-price';
import { Thumbnail } from '@gfed-medusa/sf-lib-common/components/thumbnail';
import { getPercentageDiff } from '@gfed-medusa/sf-lib-common/lib/utils/get-percentage-diff';
import { convertToLocale } from '@gfed-medusa/sf-lib-common/lib/utils/money';
import type { VariantPrice } from '@gfed-medusa/sf-lib-common/types/prices';
import { Text } from '@medusajs/ui';

import type { BrowseProductHitFragment } from '@/types/graphql';

type BrowseProductPreviewProps = {
  product: BrowseProductHitFragment;
  isFeatured?: boolean;
  imagePriority?: boolean;
  imageFetchPriority?: 'auto' | 'high' | 'low';
};

const getBrowseProductPrice = (
  product: BrowseProductHitFragment
): VariantPrice | null => {
  if (
    typeof product.priceAmount !== 'number' ||
    !product.currencyCode ||
    !product.currencyCode.trim()
  ) {
    return null;
  }

  const originalPrice = product.originalPriceAmount ?? product.priceAmount;
  const isSale =
    typeof originalPrice === 'number' && originalPrice > product.priceAmount;

  return {
    calculated_price_number: product.priceAmount,
    calculated_price: convertToLocale({
      amount: product.priceAmount,
      currency_code: product.currencyCode,
    }),
    original_price_number: originalPrice,
    original_price: convertToLocale({
      amount: originalPrice,
      currency_code: product.currencyCode,
    }),
    currency_code: product.currencyCode,
    price_type: isSale ? 'sale' : 'default',
    percentage_diff:
      isSale && originalPrice > 0
        ? getPercentageDiff(originalPrice, product.priceAmount)
        : '0',
  };
};

const BrowseProductPreview = ({
  product,
  isFeatured,
  imagePriority = false,
  imageFetchPriority,
}: BrowseProductPreviewProps) => {
  const price = getBrowseProductPrice(product);

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={[]}
          size="full"
          isFeatured={isFeatured}
          imagePriority={imagePriority}
          imageFetchPriority={imageFetchPriority}
        />
        <div className="txt-compact-medium mt-4 flex min-w-0 flex-col items-start gap-y-1 text-left">
          <Text
            className="text-ui-fg-subtle w-full min-w-0 break-words whitespace-normal"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="flex w-full min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-left">
            {price && <PreviewPrice price={price} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
};

export { BrowseProductPreview };

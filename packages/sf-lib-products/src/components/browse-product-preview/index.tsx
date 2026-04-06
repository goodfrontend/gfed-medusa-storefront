import {
  ProductPreview,
  type ProductPreviewProduct,
} from '@gfed-medusa/sf-lib-common/components/product-preview';

import type { BrowseProductHitFragment } from '@/types/graphql';

type BrowseProductPreviewProps = {
  product: BrowseProductHitFragment;
  isFeatured?: boolean;
  imagePriority?: boolean;
  imageFetchPriority?: 'auto' | 'high' | 'low';
};

const toProductPreviewProduct = (
  product: BrowseProductHitFragment
): ProductPreviewProduct => {
  const hasPrice =
    typeof product.priceAmount === 'number' && Boolean(product.currencyCode);
  const price = hasPrice
    ? {
        __typename: 'Price' as const,
        amount: product.priceAmount,
        currencyCode: product.currencyCode!,
        priceType: 'default',
      }
    : null;
  const originalPrice =
    hasPrice && typeof product.originalPriceAmount === 'number'
      ? {
          __typename: 'Price' as const,
          amount: product.originalPriceAmount,
          currencyCode: product.currencyCode!,
          priceType: 'default',
        }
      : price;

  return {
    id: product.id,
    title: product.title || '',
    handle: product.handle,
    thumbnail: product.thumbnail,
    images: [],
    variants: price
      ? [
          {
            __typename: 'ProductVariant' as const,
            id: `${product.id}-browse-preview`,
            price,
            originalPrice,
          },
        ]
      : [],
  };
};

const BrowseProductPreview = ({
  product,
  isFeatured,
  imagePriority,
  imageFetchPriority,
}: BrowseProductPreviewProps) => {
  return (
    <ProductPreview
      product={toProductPreviewProduct(product)}
      isFeatured={isFeatured}
      imagePriority={imagePriority}
      imageFetchPriority={imageFetchPriority}
    />
  );
};

export { BrowseProductPreview };

import { Text } from '@medusajs/ui';

import { getProductPrice } from '@/lib/utils/get-product-price';
import { Product } from '@/types/graphql';

import { LocalizedClientLink } from '../localized-client-link';
import { PreviewPrice } from '../preview-price';
import { Thumbnail } from '../thumbnail';

export type ProductPreviewProduct = Pick<
  Product,
  'id' | 'title' | 'handle' | 'thumbnail' | 'images' | 'variants'
>;

export type ProductPreviewProps = {
  product: ProductPreviewProduct;
  isFeatured?: boolean;
  imagePriority?: boolean;
  imageFetchPriority?: 'auto' | 'high' | 'low';
};

function ProductPreview({
  product,
  isFeatured,
  imagePriority = false,
  imageFetchPriority,
}: ProductPreviewProps) {
  const { cheapestPrice } = getProductPrice({
    product,
  });

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
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
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
}

export { ProductPreview };

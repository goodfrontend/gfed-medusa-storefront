import DOMPurify from 'isomorphic-dompurify';

import { LocalizedClientLink } from '@gfed-medusa/sf-lib-common/components/localized-client-link';
import { Heading } from '@medusajs/ui';

import { Product } from '@/types/graphql';

type ProductInfoProps = {
  product: Product;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="mx-auto flex flex-col gap-y-4 lg:max-w-[500px]">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-ui-fg-base text-3xl leading-10"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <div
          className="txt-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description ?? ''),
          }}
        />
      </div>
    </div>
  );
};

export default ProductInfo;

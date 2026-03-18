import { InteractiveLink } from '@gfed-medusa/sf-lib-common/components/interactive-link';
import {
  ProductPreview,
  type ProductPreviewProduct,
} from '@gfed-medusa/sf-lib-common/components/product-preview';
import { Text } from '@medusajs/ui';

type FeaturedCategoryRailProps = {
  handle: string;
  products: ProductPreviewProduct[];
  title: string;
};

export function FeaturedCategoryRail({
  handle,
  products,
  title,
}: FeaturedCategoryRailProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="content-container small:py-24 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Text className="txt-xlarge">{title}</Text>
        <InteractiveLink
          className="text-ui-fg-base hover:text-ui-fg-subtle"
          href={`/categories/${handle}`}
        >
          View all
        </InteractiveLink>
      </div>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-px pb-2 pt-px">
        {products.map((product) => (
          <li
            className="w-[max(11rem,calc((100%-3rem)/3))] shrink-0 snap-start"
            key={product.id}
          >
            <ProductPreview product={product} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  );
}

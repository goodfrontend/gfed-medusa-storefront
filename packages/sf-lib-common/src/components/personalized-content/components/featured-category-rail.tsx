import { Text } from '@medusajs/ui';

import { getImageKitUrl } from '../../../lib/utils/imagekit';
import { LocalizedClientLink } from '../../localized-client-link';

interface ProductPreview {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string | null;
}

interface FeaturedCategoryRailProps {
  title: string;
  handle: string;
  products: ProductPreview[];
}

export function FeaturedCategoryRail({ title, handle, products }: FeaturedCategoryRailProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="content-container small:py-24 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Text className="txt-xlarge">{title}</Text>
        <LocalizedClientLink
          className="text-ui-fg-base hover:text-ui-fg-subtle"
          href={`/categories/${handle}`}
        >
          View all
        </LocalizedClientLink>
      </div>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-px pb-2 pt-px">
        {products.map((product) => (
          <li
            className="w-[max(11rem,calc((100%-3rem)/3))] shrink-0 snap-start"
            key={product.id}
          >
            <LocalizedClientLink href={`/products/${product.handle}`} className="group">
              {product.thumbnail && (
                <img
                  src={getImageKitUrl(product.thumbnail, { width: 400, quality: 80 })}
                  alt={product.title}
                  className="aspect-[3/4] w-full rounded-lg object-cover"
                />
              )}
              <div className="txt-compact-medium mt-4 flex flex-col items-start gap-y-1 text-left">
                <Text className="text-ui-fg-subtle w-full min-w-0 overflow-hidden break-words whitespace-normal">
                  {product.title}
                </Text>
              </div>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

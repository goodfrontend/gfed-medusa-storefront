'use client';

import { Heading, Text } from '@medusajs/ui';

import { LocalizedClientLink } from '../../localized-client-link';
import { ProductPreview, type ProductPreviewProduct } from '../../product-preview';

interface ProductCarouselProps {
  title?: string;
  productIds?: string[];
  products?: ProductPreviewProduct[];
  strategy?: string;
  maxItems?: number;
}

export function ProductCarousel({ title, products, strategy, maxItems = 10 }: ProductCarouselProps) {
  const items = products?.slice(0, maxItems);

  if (!items || items.length === 0) {
    return (
      <section className="border-ui-border-base border-b py-8">
        <div className="content-container">
          {title && (
            <Heading level="h2" className="text-ui-fg-base mb-4 text-2xl font-normal">
              {title}
            </Heading>
          )}
          <Text className="text-ui-fg-muted text-sm">
            {strategy === 'category_affinity' ? 'Recommended for you' : 'Trending products'}
          </Text>
        </div>
      </section>
    );
  }

  return (
    <section className="border-ui-border-base border-b py-8">
      <div className="content-container">
        <div className="mb-6 flex items-center justify-between">
          {title && (
            <Heading level="h2" className="text-ui-fg-base text-2xl font-normal">
              {title}
            </Heading>
          )}
        </div>
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {items.map((product) => (
            <li
              key={product.id}
              className="w-[clamp(10rem,calc((100%-3rem)/3),14rem)] shrink-0 snap-start"
            >
              <ProductPreview product={product} isFeatured />
            </li>
          ))}
        </ul>
        {strategy && (
          <Text className="text-ui-fg-muted mt-4 text-xs">
            {strategy === 'category_affinity' ? 'Based on your browsing' : 'Popular right now'}
          </Text>
        )}
      </div>
    </section>
  );
}

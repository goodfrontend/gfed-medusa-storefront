import { InteractiveLink } from '@gfed-medusa/sf-lib-common/components/interactive-link';
import { ProductPreview } from '@gfed-medusa/sf-lib-common/components/product-preview';
import { Collection, Product } from '@gfed-medusa/sf-lib-common/types/graphql';
import { Text } from '@medusajs/ui';

export default async function ProductRail({
  collection,
}: {
  collection: Collection;
}) {
  if (!collection.products || collection.products.count === 0) {
    return null;
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="mb-8 flex justify-between">
        <Text className="txt-xlarge">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-24 small:grid-cols-3 small:gap-y-36">
        {collection.products.items &&
          collection.products.items.map((product) => (
            <li key={product?.id}>
              <ProductPreview product={product as Product} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  );
}

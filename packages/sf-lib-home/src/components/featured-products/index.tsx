import { Collection } from '@gfed-medusa/sf-lib-common/types/graphql';

import { ProductRail } from '@/components/product-rail';

export function FeaturedProducts({
  collections,
}: {
  collections: Collection[];
}) {
  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductRail collection={collection} />
    </li>
  ));
}

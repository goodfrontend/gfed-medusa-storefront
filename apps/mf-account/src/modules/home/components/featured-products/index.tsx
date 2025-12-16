import { Collection } from '@gfed-medusa/sf-lib-common/types/graphql';

import ProductRail from './product-rail';

export default async function FeaturedProducts({
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

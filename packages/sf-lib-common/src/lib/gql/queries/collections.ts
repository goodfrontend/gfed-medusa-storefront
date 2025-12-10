import { gql } from '@apollo/client';

import {
  COLLECTION_PRODUCTS_FRAGMENT,
  PRODUCT_COLLECTION_FRAGMENT,
} from '../fragments/product';

export const GET_COLLECTIONS_QUERY = gql`
  query GetCollections($limit: Int, $offset: Int) {
    collections(limit: $limit, offset: $offset) {
      ...ProductCollection
      products {
        ...CollectionProducts
      }
    }
  }
  ${PRODUCT_COLLECTION_FRAGMENT}
  ${COLLECTION_PRODUCTS_FRAGMENT}
`;

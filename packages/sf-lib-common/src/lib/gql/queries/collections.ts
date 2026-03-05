import { gql } from '@apollo/client';

import {
  COLLECTION_PRODUCTS_FRAGMENT,
  COLLECTION_PRODUCTS_HOME_FRAGMENT,
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

export const GET_COLLECTIONS_HOME_QUERY = gql`
  query GetCollectionsHome($limit: Int, $offset: Int) {
    collections(limit: $limit, offset: $offset) {
      ...ProductCollection
      products {
        ...CollectionProductsHome
      }
    }
  }
  ${PRODUCT_COLLECTION_FRAGMENT}
  ${COLLECTION_PRODUCTS_HOME_FRAGMENT}
`;

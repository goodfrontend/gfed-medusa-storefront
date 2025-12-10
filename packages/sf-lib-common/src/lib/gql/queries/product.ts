import { gql } from '@apollo/client';

import {
  PRODUCT_CATEGORY_FRAGMENT,
  PRODUCT_HIT_FRAGMENT,
} from '../fragments/product';

export const SEARCH_SUGGESTIONS_QUERY = gql`
  query SearchSuggestions($query: String!) {
    searchProducts(query: $query) {
      items {
        ...ProductHit
      }
    }
  }
  ${PRODUCT_HIT_FRAGMENT}
`;

export const GET_PRODUCT_CATEGORIES_QUERY = gql`
  query GetProductCategories(
    $limit: Int
    $offset: Int
    $q: String
    $handle: String
    $parent_category_id: String
  ) {
    productCategories(
      limit: $limit
      offset: $offset
      q: $q
      handle: $handle
      parent_category_id: $parent_category_id
    ) {
      ...ProductCategory
      parentCategory {
        ...ProductCategory
      }
      categoryChildren {
        ...ProductCategory
      }
      products {
        count
      }
    }
  }
  ${PRODUCT_CATEGORY_FRAGMENT}
`;

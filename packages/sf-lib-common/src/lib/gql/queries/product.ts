import { gql } from '@apollo/client';

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
      id
      name
      handle
    }
  }
`;

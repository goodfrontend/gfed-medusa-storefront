import { gql } from '@apollo/client';

import { PRODUCT_CATEGORY_FRAGMENT } from '../fragments/product';

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

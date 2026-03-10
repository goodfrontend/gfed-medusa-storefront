import { gql } from '@apollo/client';

import {
  COLLECTION_PRODUCTS_FRAGMENT,
  PRODUCT_CATEGORY_FRAGMENT,
  PRODUCT_COLLECTION_FRAGMENT,
  PRODUCT_CONTENT_FRAGMENT,
  PRODUCT_FRAGMENT,
  PRODUCT_HIT_FRAGMENT,
  PRODUCT_PREVIEW_FRAGMENT,
  PRODUCT_VARIANT_PRICING_FRAGMENT,
} from '../fragments/product';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts(
    $limit: Int
    $offset: Int
    $order: String
    $handle: String
    $region_id: String
    $category_id: [String]
    $collection_id: [String]
    $q: String
    $is_giftcard: Boolean
    $id: [ID!]
    $tag_id: [String!]
  ) {
    products(
      limit: $limit
      offset: $offset
      order: $order
      handle: $handle
      region_id: $region_id
      category_id: $category_id
      collection_id: $collection_id
      q: $q
      id: $id
      is_giftcard: $is_giftcard
      tag_id: $tag_id
    ) {
      products {
        ...Product
      }
      count
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCTS_PREVIEW_QUERY = gql`
  query GetProductsPreview(
    $limit: Int
    $offset: Int
    $order: String
    $handle: String
    $region_id: String
    $category_id: [String]
    $collection_id: [String]
    $q: String
    $is_giftcard: Boolean
    $id: [ID!]
    $tag_id: [String!]
  ) {
    products(
      limit: $limit
      offset: $offset
      order: $order
      handle: $handle
      region_id: $region_id
      category_id: $category_id
      collection_id: $collection_id
      q: $q
      id: $id
      is_giftcard: $is_giftcard
      tag_id: $tag_id
    ) {
      products {
        ...ProductPreview
      }
      count
    }
  }
  ${PRODUCT_PREVIEW_FRAGMENT}
`;

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!, $region_id: String) {
    product(id: $id, region_id: $region_id) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_CONTENT_BY_HANDLE_QUERY = gql`
  query GetProductContentByHandle(
    $handle: String
    $region_id: String
    $limit: Int
  ) {
    products(handle: $handle, region_id: $region_id, limit: $limit) {
      products {
        ...ProductContent
      }
    }
  }
  ${PRODUCT_CONTENT_FRAGMENT}
`;

export const GET_PRODUCT_PRICING_QUERY = gql`
  query GetProductPricing($id: ID!, $region_id: String) {
    product(id: $id, region_id: $region_id) {
      variants {
        ...ProductVariantPricing
      }
    }
  }
  ${PRODUCT_VARIANT_PRICING_FRAGMENT}
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
      id
      name
      description
    }
  }
`;

export const GET_PRODUCT_CATEGORY_QUERY = gql`
  query GetProductCategory($id: ID!) {
    productCategory(id: $id) {
      ...ProductCategory
      parentCategory {
        ...ProductCategory
        parentCategory {
          ...ProductCategory
        }
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

export const GET_COLLECTIONS_SUMMARY_QUERY = gql`
  query GetCollectionsSummary($limit: Int, $offset: Int, $handle: [String]) {
    collections(limit: $limit, offset: $offset, handle: $handle) {
      id
      title
    }
  }
`;

export const GET_COLLECTION_QUERY = gql`
  query GetCollection($id: ID!) {
    collection(id: $id) {
      ...ProductCollection
      products {
        ...CollectionProducts
      }
    }
  }
  ${COLLECTION_PRODUCTS_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

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

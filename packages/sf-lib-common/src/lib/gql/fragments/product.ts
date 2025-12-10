import { gql } from '@apollo/client';

export const PRICE_FRAGMENT = gql`
  fragment Price on Price {
    amount
    currencyCode
    priceType
  }
`;

export const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ProductVariant on ProductVariant {
    id
    sku
    inventoryQuantity
    allowBackorder
    manageInventory
    title
    options {
      id
      optionId
      value
    }
    price {
      ...Price
    }
    originalPrice {
      ...Price
    }
  }
  ${PRICE_FRAGMENT}
`;

export const PRODUCT_HIT_FRAGMENT = gql`
  fragment ProductHit on ProductHit {
    id
    title
    description
    handle
    thumbnail
  }
`;

export const PRODUCT_CATEGORY_FRAGMENT = gql`
  fragment ProductCategory on ProductCategory {
    id
    name
    description
    handle
  }
`;

export const PRODUCT_COLLECTION_FRAGMENT = gql`
  fragment ProductCollection on Collection {
    id
    title
    handle
  }
`;

export const PRODUCT_IMAGE_FRAGMENT = gql`
  fragment ProductImage on ProductImage {
    id
    url
  }
`;

export const COLLECTION_PRODUCTS_FRAGMENT = gql`
  fragment CollectionProducts on ProductList {
    count
    items {
      id
      title
      handle
      thumbnail
      images {
        ...ProductImage
      }
      variants {
        price {
          ...Price
        }
        originalPrice {
          ...Price
        }
      }
    }
  }
  ${PRODUCT_IMAGE_FRAGMENT}
  ${PRICE_FRAGMENT}
`;

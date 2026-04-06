import { gql } from '@apollo/client';

export const PRODUCT_IMAGE_FRAGMENT = gql`
  fragment ProductImage on ProductImage {
    id
    url
  }
`;

export const PRODUCT_TAG_FRAGMENT = gql`
  fragment ProductTag on ProductTag {
    id
  }
`;

export const PRODUCT_OPTION_FRAGMENT = gql`
  fragment ProductOption on ProductOption {
    id
    title
    values {
      id
      value
    }
  }
`;

export const PRICE_FRAGMENT = gql`
  fragment Price on Price {
    amount
    currencyCode
    priceType
  }
`;

export const PRODUCT_VARIANT_CONTENT_FRAGMENT = gql`
  fragment ProductVariantContent on ProductVariant {
    id
    sku
    allowBackorder
    manageInventory
    title
    options {
      id
      optionId
      value
    }
  }
`;

export const PRODUCT_VARIANT_PRICING_FRAGMENT = gql`
  fragment ProductVariantPricing on ProductVariant {
    id
    inventoryQuantity
    price {
      ...Price
    }
    originalPrice {
      ...Price
    }
  }
  ${PRICE_FRAGMENT}
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

export const PRODUCT_CONTENT_FRAGMENT = gql`
  fragment ProductContent on Product {
    id
    title
    description
    thumbnail
    width
    weight
    length
    height
    originCountry
    material
    type
    collectionId
    images {
      ...ProductImage
    }
    tags {
      ...ProductTag
    }
    options {
      id
      title
      values {
        value
      }
    }
    variants {
      id
      inventoryQuantity
      allowBackorder
      manageInventory
      options {
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
    collection {
      title
      handle
    }
  }
  ${PRODUCT_IMAGE_FRAGMENT}
  ${PRODUCT_TAG_FRAGMENT}
  ${PRICE_FRAGMENT}
`;

export const PRODUCT_FRAGMENT = gql`
  fragment Product on Product {
    id
    title
    handle
    description
    thumbnail
    width
    weight
    length
    height
    originCountry
    material
    type
    collectionId
    createdAt
    images {
      ...ProductImage
    }
    tags {
      ...ProductTag
    }
    options {
      ...ProductOption
    }
    variants {
      ...ProductVariant
    }
    collection {
      ...ProductCollection
    }
  }
  ${PRODUCT_IMAGE_FRAGMENT}
  ${PRODUCT_TAG_FRAGMENT}
  ${PRODUCT_OPTION_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_COLLECTION_FRAGMENT}
`;

export const PRODUCT_PREVIEW_FRAGMENT = gql`
  fragment ProductPreview on Product {
    id
    title
    handle
    thumbnail
    createdAt
    variants {
      id
      price {
        ...Price
      }
      originalPrice {
        ...Price
      }
    }
  }
  ${PRICE_FRAGMENT}
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

export const PRODUCT_HIT_FRAGMENT = gql`
  fragment ProductHit on ProductHit {
    id
    title
    description
    handle
    thumbnail
  }
`;

export const BROWSE_PRODUCT_HIT_FRAGMENT = gql`
  fragment BrowseProductHit on BrowseProductHit {
    id
    title
    description
    handle
    thumbnail
    collectionId
    collectionHandle
    categoryIds
    categoryHandles
    isSellable
    priceAmount
    originalPriceAmount
    currencyCode
    displayPrice
    displayOriginalPrice
  }
`;

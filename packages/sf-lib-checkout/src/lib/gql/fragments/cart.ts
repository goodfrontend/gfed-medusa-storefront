import { gql } from '@apollo/client';

import { PRODUCT_VARIANT_FRAGMENT } from './product';

export const LINE_ITEM_FRAGMENT = gql`
  fragment CartItemFields on LineItem {
    id
    title
    quantity
    unitPrice
    createdAt
    thumbnail
    productHandle
    productTitle
    total
    originalTotal
    variant {
      ...ProductVariant
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

export const ADDRESS_FRAGMENT = gql`
  fragment AddressFields on Address {
    firstName
    lastName
    phone
    address1
    city
    countryCode
    postalCode
  }
`;

export const SHIPPING_METHODS_FRAGMENT = gql`
  fragment ShippingMethodFields on ShippingMethod {
    id
    cartId
    name
    amount
    shippingOptionId
    createdAt
    total
  }
`;

export const PAYMENT_COLLECTION_FRAGMENT = gql`
  fragment PaymentCollectionFields on PaymentCollection {
    id
    currencyCode
    amount
    status
    paymentProviders {
      id
    }
    paymentSessions {
      id
      amount
      currencyCode
      providerId
      data
      status
    }
  }
`;

export const COUNTRY_FRAGMENT = gql`
  fragment CountryFields on Country {
    id
    iso2
    name
    displayName
  }
`;

export const REGION_FRAGMENT = gql`
  fragment RegionFields on Region {
    id
    name
    currencyCode
    createdAt
    countries {
      ...CountryFields
    }
  }
  ${COUNTRY_FRAGMENT}
`;

export const PROMOTION_FRAGMENT = gql`
  fragment PromotionFields on Promotion {
    id
    code
    applicationMethod {
      value
      type
      currencyCode
    }
  }
`;

export const CART_FRAGMENT = gql`
  fragment CartFields on Cart {
    id
    customerId
    regionId
    email
    total
    subtotal
    taxTotal
    itemTotal
    discountTotal
    originalTotal
    currencyCode
    shippingTotal
    giftCardTotal
    promotions {
      ...PromotionFields
    }
    items {
      ...CartItemFields
    }
    shippingAddress {
      ...AddressFields
    }
    billingAddress {
      ...AddressFields
    }
    region {
      ...RegionFields
    }
    shippingMethods {
      ...ShippingMethodFields
    }
    paymentCollection {
      ...PaymentCollectionFields
    }
  }
  ${LINE_ITEM_FRAGMENT}
  ${ADDRESS_FRAGMENT}
  ${REGION_FRAGMENT}
  ${SHIPPING_METHODS_FRAGMENT}
  ${PAYMENT_COLLECTION_FRAGMENT}
  ${PROMOTION_FRAGMENT}
`;

import { gql } from '@apollo/client';

import {
  ADDRESS_FRAGMENT,
  CART_FRAGMENT,
  LINE_ITEM_FRAGMENT,
  PAYMENT_COLLECTION_FRAGMENT,
  SHIPPING_METHODS_FRAGMENT,
} from '../fragments/cart';

export const CREATE_CART_MUTATION = gql`
  mutation CreateCart($data: CreateCartInput!) {
    createCart(data: $data) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
`;

export const UPDATE_CART_MUTATION = gql`
  mutation UpdateCart($id: ID!, $data: UpdateCartInput!) {
    updateCart(id: $id, data: $data) {
      ...CartFields
      regionId
      currencyCode
      shippingAddress {
        ...AddressFields
      }
      billingAddress {
        ...AddressFields
      }
    }
  }
  ${CART_FRAGMENT}
  ${ADDRESS_FRAGMENT}
`;

export const CREATE_LINE_ITEM_MUTATION = gql`
  mutation CreateLineItem($cartId: ID!, $data: CreateLineItemInput!) {
    createLineItem(cartId: $cartId, data: $data) {
      id
      total
      items {
        ...CartItemFields
      }
    }
  }
  ${LINE_ITEM_FRAGMENT}
`;

export const UPDATE_LINE_ITEM_MUTATION = gql`
  mutation UpdateLineItem(
    $cartId: ID!
    $lineItemId: ID!
    $data: UpdateLineItemInput!
  ) {
    updateLineItem(cartId: $cartId, lineItemId: $lineItemId, data: $data) {
      id
      total
      items {
        ...CartItemFields
      }
    }
  }
  ${LINE_ITEM_FRAGMENT}
`;

export const DELETE_LINE_ITEM_MUTATION = gql`
  mutation DeleteLineItem($cartId: ID!, $lineItemId: ID!) {
    deleteLineItem(cartId: $cartId, lineItemId: $lineItemId) {
      id
      object
      deleted
    }
  }
`;

export const ADD_SHIPPING_METHOD_MUTATION = gql`
  mutation AddShippingMethod($cartId: ID!, $optionId: ID!) {
    addShippingMethod(cartId: $cartId, optionId: $optionId) {
      id
      total
      items {
        ...CartItemFields
      }
      shippingMethods {
        ...ShippingMethodFields
      }
    }
  }
  ${LINE_ITEM_FRAGMENT}
  ${SHIPPING_METHODS_FRAGMENT}
`;

export const COMPLETE_CART_MUTATION = gql`
  mutation CompleteCart($cartId: ID!) {
    completeCart(cartId: $cartId) {
      __typename
      ... on CompleteCartOrderResult {
        type
        order {
          id
          email
          status
          total
          createdAt
          currencyCode
          customerId
          fulfillmentStatus
          displayId
          subtotal
          discountTotal
          giftCardTotal
          shippingTotal
          taxTotal
          paymentCollections {
            ...PaymentCollectionFields
          }
          items {
            ...CartItemFields
          }
          shippingMethods {
            ...ShippingMethodFields
          }
          shippingAddress {
            ...AddressFields
          }
        }
      }
      ... on CompleteCartErrorResult {
        type
        error {
          message
          name
          type
        }
        cart {
          id
          total
          items {
            ...CartItemFields
          }
        }
      }
    }
  }
  ${LINE_ITEM_FRAGMENT}
  ${ADDRESS_FRAGMENT}
  ${SHIPPING_METHODS_FRAGMENT}
  ${PAYMENT_COLLECTION_FRAGMENT}
`;

export const TRANSFER_CART_MUTATION = gql`
  mutation TransferCart($cartId: ID!) {
    transferCart(cartId: $cartId) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
`;

export const APPLY_PROMOTIONS_MUTATION = gql`
  mutation ApplyPromotions($cartId: ID!, $codes: [String!]!) {
    applyPromotions(cartId: $cartId, codes: $codes) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
`;

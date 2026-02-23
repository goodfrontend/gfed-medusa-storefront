import { gql } from '@apollo/client';

import {
  ADDRESS_FRAGMENT,
  CART_FRAGMENT,
  LINE_ITEM_FRAGMENT,
} from '../fragments/cart';

export const CREATE_CART_MUTATION = gql`
  mutation CreateCart($data: CreateCartInput!) {
    createCart(data: $data) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
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

export const DELETE_LINE_ITEM_MUTATION = gql`
  mutation DeleteLineItem($cartId: ID!, $lineItemId: ID!) {
    deleteLineItem(cartId: $cartId, lineItemId: $lineItemId) {
      id
      object
      deleted
    }
  }
`;

export const TRANSFER_CART_MUTATION = gql`
  mutation TransferCart($cartId: ID!) {
    transferCart(cartId: $cartId) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
`;

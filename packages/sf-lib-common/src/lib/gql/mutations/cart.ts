import { gql } from '@apollo/client';

import { ADDRESS_FRAGMENT, CART_FRAGMENT } from '../fragments/cart';

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

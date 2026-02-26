import { gql } from '@apollo/client';

import { CART_FRAGMENT } from '../fragments/cart';

export const INITIATE_PAYMENT_SESSION_MUTATION = gql`
  mutation InitiatePaymentSession($cartId: ID!, $providerId: String!) {
    initiatePaymentSession(cartId: $cartId, providerId: $providerId) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
`;

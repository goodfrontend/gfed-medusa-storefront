import { gql } from '@apollo/client';

export const REQUEST_ORDER_TRANSFER_MUTATION = gql`
  mutation RequestOrderTransfer($orderId: ID!) {
    requestOrderTransfer(orderId: $orderId) {
      success
      error
      order {
        id
        email
      }
    }
  }
`;

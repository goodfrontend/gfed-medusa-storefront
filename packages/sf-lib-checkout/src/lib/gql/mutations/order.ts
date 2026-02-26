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

export const ACCEPT_ORDER_TRANSFER_MUTATION = gql`
  mutation AcceptOrderTransfer($orderId: ID!, $token: String!) {
    acceptOrderTransfer(orderId: $orderId, token: $token) {
      success
      error
      order {
        id
        email
      }
    }
  }
`;

export const DECLINE_ORDER_TRANSFER_MUTATION = gql`
  mutation DeclineOrderTransfer($orderId: ID!, $token: String!) {
    declineOrderTransfer(orderId: $orderId, token: $token) {
      success
      error
      order {
        id
        email
      }
    }
  }
`;

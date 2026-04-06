import { gql } from '@apollo/client';

export const GET_CART_ITEM_COUNT_QUERY = gql`
  query GetCartItemCount($id: ID!) {
    cart(id: $id) {
      items {
        quantity
      }
    }
  }
`;

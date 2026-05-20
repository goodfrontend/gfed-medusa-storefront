import { gql } from '@apollo/client';

export const GET_CART_TOTAL_QUERY = gql`
  query GetCartTotal($id: String!) {
    cart(id: $id) {
      total
    }
  }
`;
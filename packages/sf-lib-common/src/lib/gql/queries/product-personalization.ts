import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_HANDLE_FOR_PERSONALIZATION = gql`
  query GetProductByHandleForPersonalization($handle: String!) {
    products(handle: $handle, limit: 1) {
      products {
        id
        categories {
          handle
        }
        variants {
          id
          calculatedPrice {
            amount
          }
        }
      }
    }
  }
`;
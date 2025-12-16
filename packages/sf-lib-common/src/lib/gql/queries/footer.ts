import { gql } from '@apollo/client';

export const GET_FOOTER_QUERY = gql`
  query GetFooter {
    footer {
      storeName
      social {
        text
        url
      }
      copyright
      poweredByCta {
        text
      }
    }
  }
`;

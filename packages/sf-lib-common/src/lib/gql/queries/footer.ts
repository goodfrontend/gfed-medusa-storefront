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

export const GET_FOOTER_DATA_QUERY = gql`
  query GetFooterData($collectionLimit: Int, $categoryLimit: Int) {
    collections(limit: $collectionLimit) {
      id
      title
      handle
    }
    productCategories(parent_category_id: null, limit: $categoryLimit) {
      id
      name
      handle
    }
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

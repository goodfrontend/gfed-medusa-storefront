import { gql } from '@apollo/client';

export const LIST_REGIONS_QUERY = gql`
  query ListRegions {
    regions {
      id
      name
      currencyCode
      createdAt
      countries {
        id
        iso2
        name
        displayName
      }
    }
  }
`;

export const GET_REGION_QUERY = gql`
  query GetRegion($id: ID!) {
    region(id: $id) {
      id
      name
      currencyCode
      createdAt
      countries {
        id
        iso2
        name
        displayName
      }
    }
  }
`;

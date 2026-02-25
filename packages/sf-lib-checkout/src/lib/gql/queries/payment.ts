import { gql } from '@apollo/client';

export const GET_PAYMENT_PROVIDERS_QUERY = gql`
  query GetPaymentProviders($regionId: ID!) {
    paymentProviders(regionId: $regionId) {
      id
    }
  }
`;

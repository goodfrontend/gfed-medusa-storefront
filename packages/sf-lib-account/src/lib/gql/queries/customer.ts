import { gql } from '@apollo/client';

import { CUSTOMER_FRAGMENT } from '../fragments/customer';

export const GET_CUSTOMER_QUERY = gql`
  query GetCustomer {
    me {
      ...Customer
    }
  }
  ${CUSTOMER_FRAGMENT}
`;

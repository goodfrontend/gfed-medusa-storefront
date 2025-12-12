import { gql } from '@apollo/client';

export const CUSTOMER_ADDRESS_FRAGMENT = gql`
  fragment CustomerAddress on CustomerAddress {
    id
    addressName
    isDefaultShipping
    isDefaultBilling
    customerId
    company
    firstName
    lastName
    address1
    address2
    city
    countryCode
    province
    postalCode
    phone
  }
`;

export const CUSTOMER_FRAGMENT = gql`
  fragment Customer on Customer {
    id
    email
    defaultBillingAddressId
    defaultShippingAddressId
    companyName
    firstName
    lastName
    phone
    addresses {
      ...CustomerAddress
    }
  }
  ${CUSTOMER_ADDRESS_FRAGMENT}
`;

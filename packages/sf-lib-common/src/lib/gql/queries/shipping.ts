import { gql } from '@apollo/client';

export const SHIPPING_OPTION_FRAGMENT = gql`
  fragment ShippingOptionFields on ShippingOption {
    id
    name
    priceType
    amount
    serviceZoneId
    insufficientInventory
    calculatedPrice {
      amount
    }
    prices {
      amount
      currencyCode
      priceRules {
        attribute
        operator
        value
      }
    }
    serviceZone {
      fulfillmentSetType
      location {
        address {
          city
          countryCode
          address1
          postalCode
        }
      }
    }
  }
`;

export const GET_SHIPPING_OPTIONS_QUERY = gql`
  query GetShippingOptions($cartId: ID!) {
    shippingOptions(cartId: $cartId) {
      ...ShippingOptionFields
    }
  }
  ${SHIPPING_OPTION_FRAGMENT}
`;

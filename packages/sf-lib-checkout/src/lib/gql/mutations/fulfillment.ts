import { gql } from '@apollo/client';

import { SHIPPING_OPTION_FRAGMENT } from '../queries/fulfillment';

export const CALCULATE_SHIPPING_OPTION_PRICE_MUTATION = gql`
  mutation CalculateShippingOptionPrice($optionId: ID!, $cartId: ID!, $data: JSON) {
    calculateShippingOptionPrice(optionId: $optionId, cartId: $cartId, data: $data) {
      ...ShippingOptionFields
    }
  }
  ${SHIPPING_OPTION_FRAGMENT}
`;

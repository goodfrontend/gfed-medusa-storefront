import { gql } from '@apollo/client';

export const ORDER_FRAGMENT = gql`
  fragment OrderFields on Order {
    id
    displayId
    email
    customerId
    regionId
    status
    paymentStatus
    fulfillmentStatus
    currencyCode
    total
    subtotal
    discountTotal
    giftCardTotal
    shippingTotal
    taxTotal
    createdAt
    items {
      id
      title
      quantity
      unitPrice
      total
      originalTotal
      thumbnail
      productHandle
      productTitle
      variant {
        id
        title
        sku
        product {
          id
          title
          handle
          thumbnail
          createdAt
        }
      }
    }
    shippingMethods {
      id
      name
      amount
      shippingOptionId
    }
    shippingAddress {
      firstName
      lastName
      address1
      address2
      city
      postalCode
      countryCode
      phone
    }
    paymentCollections {
      id
      currencyCode
      amount
      status
      paymentProviders {
        id
      }
      payments {
        id
        amount
        currencyCode
        providerId
        createdAt
      }
    }
  }
`;

export const GET_ORDER_QUERY = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      ...OrderFields
    }
  }
  ${ORDER_FRAGMENT}
`;

export const GET_ORDERS_QUERY = gql`
  query GetOrders($limit: Int, $offset: Int) {
    orders(limit: $limit, offset: $offset) {
      orders {
        ...OrderFields
      }
      count
      limit
      offset
    }
  }
  ${ORDER_FRAGMENT}
`;

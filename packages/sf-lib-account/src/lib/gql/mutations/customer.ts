import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterCustomerInput!) {
    register(input: $input) {
      token
      customer {
        id
        email
        firstName
        lastName
        phone
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      customer {
        id
        email
        firstName
        lastName
        phone
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const UPDATE_CUSTOMER_MUTATION = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      id
      email
      firstName
      lastName
      phone
    }
  }
`;

export const ADD_CUSTOMER_ADDRESS_MUTATION = gql`
  mutation AddCustomerAddress($input: AddCustomerAddressInput!) {
    addCustomerAddress(input: $input) {
      id
      email
      firstName
      lastName
      phone
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS_MUTATION = gql`
  mutation UpdateCustomerAddress(
    $id: ID!
    $input: UpdateCustomerAddressInput!
  ) {
    updateCustomerAddress(id: $id, input: $input) {
      id
      email
      firstName
      lastName
      phone
    }
  }
`;

export const DELETE_CUSTOMER_ADDRESS_MUTATION = gql`
  mutation DeleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      id
      deleted
    }
  }
`;

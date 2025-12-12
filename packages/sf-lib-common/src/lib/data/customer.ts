import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import {
  Customer,
  GetCustomerQuery,
  GetCustomerQueryVariables,
  TransferCartMutation,
  TransferCartMutationVariables,
} from '@/types/graphql';

import {
  createServerApolloClient,
  graphqlFetch,
  graphqlMutation,
} from '../gql/apollo-client';
import { TRANSFER_CART_MUTATION } from '../gql/mutations/cart';
import { GET_CUSTOMER_QUERY } from '../gql/queries/customer';
import { medusaError } from '../utils/medusa-error';
import { getCacheTag, getCartId } from './cookies';

export const transferCart = async (): Promise<
  TransferCartMutation['transferCart'] | null
> => {
  const cartId = await getCartId();

  if (!cartId) {
    return null;
  }

  try {
    const result = await graphqlMutation<
      TransferCartMutation,
      TransferCartMutationVariables
    >({
      mutation: TRANSFER_CART_MUTATION,
      variables: {
        cartId,
      },
    });

    const cart = result?.transferCart ?? null;

    if (cart) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
    }

    return cart;
  } catch (err) {
    medusaError(err);
  }
};

export const retrieveCustomer = async (): Promise<Customer | null> => {
  const cookieHeader = (await cookies()).toString();
  const apolloClient = createServerApolloClient(cookieHeader);

  try {
    const customer = await graphqlFetch<
      GetCustomerQuery,
      GetCustomerQueryVariables
    >(
      {
        query: GET_CUSTOMER_QUERY,
        fetchPolicy: 'network-only',
      },
      apolloClient
    ).then((response) => response?.me ?? null);

    return customer;
  } catch {
    return null;
  }
};

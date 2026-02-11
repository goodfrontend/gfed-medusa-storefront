'use server';

import {
  Customer,
  GetCustomerQuery,
  GetCustomerQueryVariables,
  TransferCartMutation,
  TransferCartMutationVariables,
} from '../../types/graphql';
import {
  createServerApolloClient,
  graphqlFetch,
  graphqlMutation,
} from '../gql/apollo-client';
import { TRANSFER_CART_MUTATION } from '../gql/mutations/cart';
import { GET_CUSTOMER_QUERY } from '../gql/queries/customer';
import { medusaError } from '../utils/medusa-error';
import type { StorefrontContext } from './context';
import { getAuthHeaders, getCacheTag, getCartId } from './cookies-utils';

export const transferCart = async (
  ctx: StorefrontContext
): Promise<TransferCartMutation['transferCart'] | null> => {
  const cookieHeader = ctx.cookieHeader;
  const apolloClient = createServerApolloClient(cookieHeader);
  const cartId = getCartId(ctx);

  if (!cartId) {
    return null;
  }

  try {
    const result = await graphqlMutation<
      TransferCartMutation,
      TransferCartMutationVariables
    >(
      {
        mutation: TRANSFER_CART_MUTATION,
        variables: {
          cartId,
        },
      },
      apolloClient
    );

    const cart = result?.transferCart ?? null;

    if (cart) {
      const { revalidateTag } = await import('next/cache');
      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);
    }

    return cart;
  } catch (err) {
    medusaError(err);
    return null;
  }
};

export const retrieveCustomer = async (
  ctx: StorefrontContext
): Promise<Customer | null> => {
  const cookieHeader = ctx.cookieHeader;
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

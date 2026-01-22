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
import { StorefrontContext } from './context';
import { getCacheTag, getCartId } from './cookies';

export const transferCart = async (
  ctx: StorefrontContext = {}
): Promise<TransferCartMutation['transferCart'] | null> => {
  const cartId = getCartId(ctx);

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

    if (cart && ctx.revalidate) {
      const cartCacheTag = getCacheTag('carts', ctx);
      ctx.revalidate(cartCacheTag);
    }

    return cart;
  } catch (err) {
    medusaError(err);
    return null;
  }
};

export const retrieveCustomer = async (
  ctx: StorefrontContext = {}
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

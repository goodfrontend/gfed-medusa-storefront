import {
  GetOrderQuery,
  GetOrderQueryVariables,
  Order,
} from '@/types/graphql';

import { createServerApolloClient, graphqlFetch } from '../gql/apollo-client';
import { GET_ORDER_QUERY } from '../gql/queries/order';
import { StorefrontContext } from './context';

export const retrieveOrder = async (
  id: string,
  ctx: StorefrontContext
): Promise<Order | null> => {
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');
  try {
    const data = await graphqlFetch<GetOrderQuery, GetOrderQueryVariables>(
      { query: GET_ORDER_QUERY, variables: { id } },
      apolloClient
    );
    return data?.order ?? null;
  } catch (err) {
    console.error('Failed to fetch order:', err);
    return null;
  }
};

'use server';

import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import {
  createServerApolloClient,
  graphqlFetch,
  graphqlMutation,
} from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';

import { REQUEST_ORDER_TRANSFER_MUTATION } from '@/lib/gql/mutations/order';
import { GET_ORDERS_QUERY } from '@/lib/gql/queries/order';
import {
  GetOrdersQuery,
  GetOrdersQueryVariables,
  Order,
  OrderTransferData,
  RequestOrderTransferMutation,
  RequestOrderTransferMutationVariables,
} from '@/types/graphql';

export const createTransferRequest = async (
  _state: {
    success: boolean;
    error: string | null;
    order: OrderTransferData | null;
  },
  formData: FormData
): Promise<{
  success: boolean;
  error: string | null;
  order: OrderTransferData | null;
}> => {
  const id = formData.get('order_id') as string;

  if (!id) {
    return { success: false, error: 'Order ID is required', order: null };
  }

  try {
    const ctx = await resolveNextContext();
    const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');
    const result = await graphqlMutation<
      RequestOrderTransferMutation,
      RequestOrderTransferMutationVariables
    >({ mutation: REQUEST_ORDER_TRANSFER_MUTATION, variables: { orderId: id } }, apolloClient);
    const transfer = result?.requestOrderTransfer;
    if (transfer?.success) {
      return { success: true, error: null, order: transfer.order ?? null };
    }
    return {
      success: false,
      error: transfer?.error ?? 'Transfer request failed',
      order: null,
    };
  } catch (err: any) {
    return { success: false, error: err.message, order: null };
  }
};

export const listOrders = async (
  ctx: StorefrontContext,
  limit: number = 10,
  offset: number = 0
): Promise<Order[] | null> => {
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');
  try {
    const data = await graphqlFetch<GetOrdersQuery, GetOrdersQueryVariables>(
      { query: GET_ORDERS_QUERY, variables: { limit, offset } },
      apolloClient
    );
    return (data?.orders?.orders as Order[]) ?? null;
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    return null;
  }
};

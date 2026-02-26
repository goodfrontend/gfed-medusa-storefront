'use server';

import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';

import {
  createServerApolloClient,
  graphqlFetch,
  graphqlMutation,
} from '@/lib/gql/apollo-client';
import {
  AcceptOrderTransferMutation,
  AcceptOrderTransferMutationVariables,
  DeclineOrderTransferMutation,
  DeclineOrderTransferMutationVariables,
  GetOrderQuery,
  GetOrderQueryVariables,
  GetOrdersQuery,
  GetOrdersQueryVariables,
  Order,
  OrderTransferData,
  RequestOrderTransferMutation,
  RequestOrderTransferMutationVariables,
} from '@/lib/gql/generated-types/graphql';
import {
  ACCEPT_ORDER_TRANSFER_MUTATION,
  DECLINE_ORDER_TRANSFER_MUTATION,
  REQUEST_ORDER_TRANSFER_MUTATION,
} from '@/lib/gql/mutations/order';
import {
  GET_ORDER_QUERY,
  GET_ORDERS_QUERY,
} from '@/lib/gql/queries/order';

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

export const createTransferRequest = async (
  _state: {
    success: boolean;
    error: string | null;
    order: OrderTransferData | null;
  },
  formData: FormData,
  ctx: StorefrontContext
): Promise<{
  success: boolean;
  error: string | null;
  order: OrderTransferData | null;
}> => {
  const id = formData.get('order_id') as string;

  if (!id) {
    return { success: false, error: 'Order ID is required', order: null };
  }

  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');
  try {
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

export const acceptTransferRequest = async (
  id: string,
  token: string,
  ctx: StorefrontContext
): Promise<{ success: boolean; error: string | null; order: OrderTransferData | null }> => {
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');
  try {
    const result = await graphqlMutation<
      AcceptOrderTransferMutation,
      AcceptOrderTransferMutationVariables
    >({
      mutation: ACCEPT_ORDER_TRANSFER_MUTATION,
      variables: { orderId: id, token },
    }, apolloClient);
    const transfer = result?.acceptOrderTransfer;
    if (transfer?.success) {
      return { success: true, error: null, order: transfer.order ?? null };
    }
    return {
      success: false,
      error: transfer?.error ?? 'Accept transfer failed',
      order: null,
    };
  } catch (err: any) {
    return { success: false, error: err.message, order: null };
  }
};

export const declineTransferRequest = async (
  id: string,
  token: string,
  ctx: StorefrontContext
): Promise<{ success: boolean; error: string | null; order: OrderTransferData | null }> => {
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');
  try {
    const result = await graphqlMutation<
      DeclineOrderTransferMutation,
      DeclineOrderTransferMutationVariables
    >({
      mutation: DECLINE_ORDER_TRANSFER_MUTATION,
      variables: { orderId: id, token },
    }, apolloClient);
    const transfer = result?.declineOrderTransfer;
    if (transfer?.success) {
      return { success: true, error: null, order: transfer.order ?? null };
    }
    return {
      success: false,
      error: transfer?.error ?? 'Decline transfer failed',
      order: null,
    };
  } catch (err: any) {
    return { success: false, error: err.message, order: null };
  }
};

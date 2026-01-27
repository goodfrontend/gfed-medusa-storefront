import { HttpTypes } from '@medusajs/types';

import {
  Cart,
  DeleteLineItemMutation,
  DeleteLineItemMutationVariables,
  GetCartQuery,
  GetCartQueryVariables,
  UpdateCartMutation,
  UpdateCartMutationVariables,
} from '../../types/graphql';
import { sdk } from '../config/medusa';
import { graphqlFetch, graphqlMutation } from '../gql/apollo-client';
import {
  DELETE_LINE_ITEM_MUTATION,
  UPDATE_CART_MUTATION,
} from '../gql/mutations/cart';
import { GET_CART_QUERY } from '../gql/queries/cart';
import { medusaError } from '../utils/medusa-error';
import type { StorefrontContext } from './context';
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
} from './cookies';

export const retrieveCart = async (
  ctx: StorefrontContext
): Promise<Cart | null> => {
  const id = getCartId(ctx);
  if (!id) {
    return null;
  }

  try {
    const data = await graphqlFetch<GetCartQuery, GetCartQueryVariables>({
      query: GET_CART_QUERY,
      variables: { id },
    });

    return data?.cart ?? null;
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return null;
  }
};

export const updateCart = async (
  data: UpdateCartMutationVariables['data'],
  ctx: StorefrontContext
): Promise<UpdateCartMutation['updateCart'] | null> => {
  const cartId = getCartId(ctx);

  if (!cartId) {
    throw new Error(
      'No existing cart found, please create one before updating'
    );
  }

  try {
    const result = await graphqlMutation<
      UpdateCartMutation,
      UpdateCartMutationVariables
    >({
      mutation: UPDATE_CART_MUTATION,
      variables: {
        id: cartId,
        data,
      },
    });

    const cart = result?.updateCart ?? null;

    if (cart) {
      const { revalidateTag } = await import('next/cache');
      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = getCacheTag('fulfillment', ctx);
      revalidateTag(fulfillmentCacheTag);
    }

    return cart;
  } catch (err) {
    medusaError(err);
  }
};

export const deleteLineItem = async (
  lineId: string,
  ctx: StorefrontContext
): Promise<DeleteLineItemMutation['deleteLineItem'] | null> => {
  if (!lineId) {
    throw new Error('Missing lineItem ID when deleting line item');
  }

  const cartId = getCartId(ctx);

  if (!cartId) {
    throw new Error('Missing cart ID when deleting line item');
  }

  try {
    const result = await graphqlMutation<
      DeleteLineItemMutation,
      DeleteLineItemMutationVariables
    >({
      mutation: DELETE_LINE_ITEM_MUTATION,
      variables: {
        cartId,
        lineItemId: lineId,
      },
    });

    const deletedLineItem = result?.deleteLineItem ?? null;

    if (deletedLineItem) {
      try {
        const { revalidateTag } = await import('next/cache');
        const cartCacheTag = getCacheTag('carts', ctx);
        revalidateTag(cartCacheTag);

        const fulfillmentCacheTag = getCacheTag('fulfillment', ctx);
        revalidateTag(fulfillmentCacheTag);
      } catch {
        // Not in Next.js environment
      }
    }

    return deletedLineItem;
  } catch (error: any) {
    console.error('GraphQL deleteLineItem error:', error.message);
    throw error;
  }
};

export async function listCartOptions(ctx: StorefrontContext) {
  const cartId = getCartId(ctx);
  const headers = {
    ...getAuthHeaders(ctx),
  };
  const next = {
    ...getCacheOptions('shippingOptions', ctx),
  };

  return await sdk.client.fetch<{
    shipping_options: HttpTypes.StoreCartShippingOption[];
  }>('/store/shipping-options', {
    query: { cart_id: cartId },
    next,
    headers,
    cache: 'force-cache',
  });
}

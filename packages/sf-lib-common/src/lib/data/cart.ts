'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { HttpTypes } from '@medusajs/types';

import { sdk } from '@/lib/config/medusa';
import { graphqlFetch, graphqlMutation } from '@/lib/gql/apollo-client';
import {
  DELETE_LINE_ITEM_MUTATION,
  UPDATE_CART_MUTATION,
} from '@/lib/gql/mutations/cart';
import { GET_CART_QUERY } from '@/lib/gql/queries/cart';
import { medusaError } from '@/lib/utils/medusa-error';
import {
  Cart,
  DeleteLineItemMutation,
  DeleteLineItemMutationVariables,
  GetCartQuery,
  GetCartQueryVariables,
  UpdateCartMutation,
  UpdateCartMutationVariables,
} from '@/types/graphql';

import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
} from './cookies';
import { getRegion } from './regions';

/**
 * Retrieves a cart by its ID. If no ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to retrieve.
 * @returns The cart object if found, or null if not found.
 */
export const retrieveCart = async (cartId?: string): Promise<Cart | null> => {
  const id = cartId || (await getCartId());
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

const updateCart = async (
  data: UpdateCartMutationVariables['data']
): Promise<UpdateCartMutation['updateCart'] | null> => {
  const cartId = await getCartId();

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
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = await getCacheTag('fulfillment');
      revalidateTag(fulfillmentCacheTag);
    }

    return cart;
  } catch (err) {
    medusaError(err);
  }
};

export const deleteLineItem = async (
  lineId: string
): Promise<DeleteLineItemMutation['deleteLineItem'] | null> => {
  if (!lineId) {
    throw new Error('Missing lineItem ID when deleting line item');
  }

  const cartId = await getCartId();

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
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = await getCacheTag('fulfillment');
      revalidateTag(fulfillmentCacheTag);
    }

    return deletedLineItem;
  } catch (error: any) {
    console.error('GraphQL deleteLineItem error:', error.message);
    throw error;
  }
};

/**
 * Updates the countrycode param and revalidates the regions cache
 * @param regionId
 * @param countryCode
 */
export async function updateRegion(countryCode: string, currentPath: string) {
  const cartId = await getCartId();
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (cartId) {
    await updateCart({ regionId: region.id });
    const cartCacheTag = await getCacheTag('carts');
    revalidateTag(cartCacheTag);
  }

  const regionCacheTag = await getCacheTag('regions');
  revalidateTag(regionCacheTag);

  const productsCacheTag = await getCacheTag('products');
  revalidateTag(productsCacheTag);

  redirect(`/${countryCode}${currentPath}`);
}

export async function listCartOptions() {
  const cartId = await getCartId();
  const headers = {
    ...(await getAuthHeaders()),
  };
  const next = {
    ...(await getCacheOptions('shippingOptions')),
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

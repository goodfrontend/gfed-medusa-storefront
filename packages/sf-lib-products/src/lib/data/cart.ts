'use server';

import { revalidateTag } from 'next/cache';

import { graphqlFetch, graphqlMutation } from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import {
  getCacheTag,
  getCartId,
  setCartId,
} from '@gfed-medusa/sf-lib-common/lib/data/cookies';
import {
  Cart,
  CreateCartMutation,
  CreateCartMutationVariables,
  CreateLineItemMutation,
  CreateLineItemMutationVariables,
  GetCartQuery,
  GetCartQueryVariables,
  UpdateCartMutation,
  UpdateCartMutationVariables,
} from '@gfed-medusa/sf-lib-common/types/graphql';

import { getRegion } from './regions';
import { GET_CART_QUERY } from '@/lib/gql/queries/cart';
import {
  CREATE_CART_MUTATION,
  CREATE_LINE_ITEM_MUTATION,
  UPDATE_CART_MUTATION,
} from '@/lib/gql/mutations/cart';

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

export const getOrSetCart = async (
  countryCode: string
): Promise<Cart | null> => {
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  let cart = await retrieveCart();

  if (!cart) {
    const data = await graphqlMutation<
      CreateCartMutation,
      CreateCartMutationVariables
    >({
      mutation: CREATE_CART_MUTATION,
      variables: {
        data: { regionId: region.id },
      },
    });

    cart = data?.createCart ?? null;

    await setCartId(cart?.id || '');

    const cartCacheTag = await getCacheTag('carts');
    revalidateTag(cartCacheTag);

    if (cart) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
    }
  }

  if (cart && cart.regionId !== region.id) {
    const data = await graphqlMutation<
      UpdateCartMutation,
      UpdateCartMutationVariables
    >({
      mutation: UPDATE_CART_MUTATION,
      variables: {
        id: cart.id,
        data: { regionId: region.id },
      },
    });

    cart = data?.updateCart ?? cart;

    if (cart) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
    }
  }

  return cart;
};

export const addToCart = async ({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string;
  quantity: number;
  countryCode: string;
}): Promise<CreateLineItemMutation['createLineItem'] | null> => {
  if (!variantId) {
    throw new Error('Missing variant ID when adding to cart');
  }

  if (!countryCode) {
    throw new Error('Missing country code when adding to cart');
  }

  const cart = await getOrSetCart(countryCode);

  if (!cart) {
    throw new Error('Error retrieving or creating cart');
  }

  try {
    const result = await graphqlMutation<
      CreateLineItemMutation,
      CreateLineItemMutationVariables
    >({
      mutation: CREATE_LINE_ITEM_MUTATION,
      variables: {
        cartId: cart.id,
        data: {
          variantId: variantId,
          quantity,
        },
      },
    });

    const lineItem = result?.createLineItem ?? null;

    if (lineItem) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = await getCacheTag('fulfillment');
      revalidateTag(fulfillmentCacheTag);
    }

    return lineItem;
  } catch (error: any) {
    console.error('GraphQL addToCart error:', error.message);
    throw error;
  }
};

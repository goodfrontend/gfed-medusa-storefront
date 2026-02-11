'use server';

import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { setCartIdAction } from '@gfed-medusa/sf-lib-common/lib/data/cookies-actions';
import {
  getCacheTag,
  getCartId,
} from '@gfed-medusa/sf-lib-common/lib/data/cookies-utils';
import {
  graphqlFetch,
  graphqlMutation,
} from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
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

import {
  CREATE_CART_MUTATION,
  CREATE_LINE_ITEM_MUTATION,
  UPDATE_CART_MUTATION,
} from '@/lib/gql/mutations/cart';
import { GET_CART_QUERY } from '@/lib/gql/queries/cart';

import { getRegion } from './regions';

export const retrieveCart = async (
  cartId: string,
  ctx: StorefrontContext
): Promise<Cart | null> => {
  const id = cartId || getCartId(ctx);
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
  countryCode: string,
  ctx: StorefrontContext
): Promise<Cart | null> => {
  const region = await getRegion(countryCode, ctx);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  let cart = await retrieveCart(getCartId(ctx) || '', ctx);

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

    if (cart) {
      await setCartIdAction(cart.id);

      try {
        const { revalidateTag } = await import('next/cache');
        const cartCacheTag = getCacheTag('carts', ctx);
        revalidateTag(cartCacheTag);
      } catch {
        // Not in Next.js environment, skip revalidation
      }
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
      try {
        const { revalidateTag } = await import('next/cache');
        const cartCacheTag = getCacheTag('carts', ctx);
        revalidateTag(cartCacheTag);
      } catch {
        // Not in Next.js environment
      }
    }
  }

  return cart;
};

export const addToCart = async (
  {
    variantId,
    quantity,
    countryCode,
  }: {
    variantId: string;
    quantity: number;
    countryCode: string;
  },
  ctx: StorefrontContext
): Promise<CreateLineItemMutation['createLineItem'] | null> => {
  if (!variantId) {
    throw new Error('Missing variant ID when adding to cart');
  }

  if (!countryCode) {
    throw new Error('Missing country code when adding to cart');
  }

  const cart = await getOrSetCart(countryCode, ctx);

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

    return lineItem;
  } catch (error: any) {
    console.error('GraphQL addToCart error:', error.message);
    throw error;
  }
};

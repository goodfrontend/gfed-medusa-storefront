'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { sdk } from '@gfed-medusa/sf-lib-common/lib/config/medusa';
import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import {
  removeCartIdAction,
  setCartIdAction,
} from '@gfed-medusa/sf-lib-common/lib/data/cookies-actions';
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
} from '@gfed-medusa/sf-lib-common/lib/data/cookies-utils';
import { medusaError } from '@gfed-medusa/sf-lib-common/lib/utils/medusa-error';
import { HttpTypes } from '@medusajs/types';

import { graphqlFetch, graphqlMutation } from '@/lib/gql/apollo-client';
import {
  AddShippingMethodMutation,
  AddShippingMethodMutationVariables,
  ApplyPromotionsMutation,
  ApplyPromotionsMutationVariables,
  Cart,
  CompleteCartMutation,
  CompleteCartMutationVariables,
  CreateCartMutation,
  CreateCartMutationVariables,
  CreateLineItemMutation,
  CreateLineItemMutationVariables,
  DeleteLineItemMutation,
  DeleteLineItemMutationVariables,
  GetCartQuery,
  GetCartQueryVariables,
  UpdateCartMutation,
  UpdateCartMutationVariables,
  UpdateLineItemMutation,
  UpdateLineItemMutationVariables,
} from '@/lib/gql/generated-types/graphql';
import {
  ADD_SHIPPING_METHOD_MUTATION,
  APPLY_PROMOTIONS_MUTATION,
  COMPLETE_CART_MUTATION,
  CREATE_CART_MUTATION,
  CREATE_LINE_ITEM_MUTATION,
  DELETE_LINE_ITEM_MUTATION,
  UPDATE_CART_MUTATION,
  UPDATE_LINE_ITEM_MUTATION,
} from '@/lib/gql/mutations/cart';
import { GET_CART_QUERY } from '@/lib/gql/queries/cart';

import { getRegion } from './regions';

/**
 * Retrieves a cart by its ID. If no ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to retrieve.
 * @returns The cart object if found, or null if not found.
 */
export const retrieveCart = async (
  cartId: string | undefined,
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

  let cart = await retrieveCart(undefined, ctx);

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

    await setCartIdAction(cart?.id || '');

    const cartCacheTag = getCacheTag('carts', ctx);
    revalidateTag(cartCacheTag);

    if (cart) {
      const cartCacheTag = getCacheTag('carts', ctx);
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
      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);
    }
  }

  return cart;
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

export const addToCart = async ({
  variantId,
  quantity,
  countryCode,
  ctx,
}: {
  variantId: string;
  quantity: number;
  countryCode: string;
  ctx: StorefrontContext;
}): Promise<CreateLineItemMutation['createLineItem'] | null> => {
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
      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = getCacheTag('fulfillment', ctx);
      revalidateTag(fulfillmentCacheTag);
    }

    return lineItem;
  } catch (error: any) {
    console.error('GraphQL addToCart error:', error.message);
    throw error;
  }
};

export const updateLineItem = async (
  lineId: string,
  quantity: number,
  ctx: StorefrontContext
): Promise<UpdateLineItemMutation['updateLineItem'] | null> => {
  if (!lineId) {
    throw new Error('Missing lineItem ID when updating line item');
  }

  const cartId = getCartId(ctx);

  if (!cartId) {
    throw new Error('Missing cart ID when updating line item');
  }

  try {
    const result = await graphqlMutation<
      UpdateLineItemMutation,
      UpdateLineItemMutationVariables
    >({
      mutation: UPDATE_LINE_ITEM_MUTATION,
      variables: {
        cartId,
        lineItemId: lineId,
        data: { quantity },
      },
    });

    const lineItem = result?.updateLineItem ?? null;

    if (lineItem) {
      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = getCacheTag('fulfillment', ctx);
      revalidateTag(fulfillmentCacheTag);
    }

    return lineItem;
  } catch (error: any) {
    console.error('GraphQL updateLineItem error:', error.message);
    throw error;
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
      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);

      const fulfillmentCacheTag = getCacheTag('fulfillment', ctx);
      revalidateTag(fulfillmentCacheTag);
    }

    return deletedLineItem;
  } catch (error: any) {
    console.error('GraphQL deleteLineItem error:', error.message);
    throw error;
  }
};

export const setShippingMethod = async (
  cartId: string,
  optionId: string,
  ctx: StorefrontContext
): Promise<AddShippingMethodMutation['addShippingMethod'] | null> => {
  if (!cartId) {
    throw new Error('Missing cart ID when setting shipping method');
  }

  try {
    const result = await graphqlMutation<
      AddShippingMethodMutation,
      AddShippingMethodMutationVariables
    >({
      mutation: ADD_SHIPPING_METHOD_MUTATION,
      variables: {
        cartId,
        optionId,
      },
    });

    console.log('addShippingMethod result:', JSON.stringify(result, null, 2));
    const updatedCart = result?.addShippingMethod;

    if (updatedCart) {
      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);
    }

    return updatedCart;
  } catch (error: any) {
    console.error('GraphQL setShippingMethod error:', error.message);
    throw error;
  }
};

export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: HttpTypes.StoreInitializePaymentSession,
  ctx: StorefrontContext
) {
  const headers = {
    ...getAuthHeaders(ctx),
  };

  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, headers)
    .then(async (resp) => {
      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);
      return resp;
    })
    .catch(medusaError);
}

export const applyPromotions = async (
  codes: string[],
  ctx: StorefrontContext
): Promise<ApplyPromotionsMutation['applyPromotions'] | null> => {
  const cartId = getCartId(ctx);

  if (!cartId) {
    throw new Error('No existing cart found');
  }

  try {
    const result = await graphqlMutation<
      ApplyPromotionsMutation,
      ApplyPromotionsMutationVariables
    >({
      mutation: APPLY_PROMOTIONS_MUTATION,
      variables: {
        cartId,
        codes,
      },
    });

    const cart = result?.applyPromotions ?? null;

    if (cart) {
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

export async function applyGiftCard(code: string) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function removeDiscount(code: string) {
  // const cartId = getCartId()
  // if (!cartId) return "No cartId cookie found"
  // try {
  //   await deleteDiscount(cartId, code)
  //   revalidateTag("cart")
  // } catch (error: any) {
  //   throw error
  // }
}

export async function removeGiftCard(
  codeToRemove: string,
  giftCards: any[]
  // giftCards: GiftCard[]
) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, {
  //       gift_cards: [...giftCards]
  //         .filter((gc) => gc.code !== codeToRemove)
  //         .map((gc) => ({ code: gc.code })),
  //     }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function submitPromotionForm(
  currentState: unknown,
  formData: FormData,
  ctx: StorefrontContext
) {
  const code = formData.get('code') as string;
  try {
    await applyPromotions([code], ctx);
  } catch (e: any) {
    return e.message;
  }
}

// TODO: Pass a POJO instead of a form entity here
export async function setAddresses(
  currentState: unknown,
  formData: FormData,
  ctx: StorefrontContext
) {
  try {
    if (!formData) {
      throw new Error('No form data found when setting addresses');
    }
    const cartId = getCartId(ctx);
    if (!cartId) {
      throw new Error('No existing cart found when setting addresses');
    }

    const data = {
      shippingAddress: {
        firstName: formData.get('shippingAddress.firstName'),
        lastName: formData.get('shippingAddress.lastName'),
        address1: formData.get('shippingAddress.address1'),
        address2: '',
        company: formData.get('shippingAddress.company'),
        postalCode: formData.get('shippingAddress.postalCode'),
        city: formData.get('shippingAddress.city'),
        countryCode: formData.get('shippingAddress.countryCode'),
        province: formData.get('shippingAddress.province'),
        phone: formData.get('shippingAddress.phone'),
      },
      email: formData.get('email'),
    } as any;

    const sameAsBilling = formData.get('same-as-billing');
    if (sameAsBilling === 'on') data.billingAddress = data.shippingAddress;

    if (sameAsBilling !== 'on')
      data.billingAddress = {
        firstName: formData.get('billingAddress.firstName'),
        lastName: formData.get('billingAddress.lastName'),
        address1: formData.get('billingAddress.address1'),
        address2: '',
        company: formData.get('billingAddress.company'),
        postalCode: formData.get('billingAddress.postalCode'),
        city: formData.get('billingAddress.city'),
        countryCode: formData.get('billingAddress.countryCode'),
        province: formData.get('billingAddress.province'),
        phone: formData.get('billingAddress.phone'),
      };
    await updateCart(data, ctx);
  } catch (e: any) {
    return e.message;
  }

  redirect(
    `/${formData.get('shippingAddress.countryCode')}/checkout?step=delivery`
  );
}

export async function placeOrder(
  cartId: string | undefined,
  ctx: StorefrontContext
) {
  const id = cartId || getCartId(ctx);

  if (!id) throw new Error('No existing cart found when placing an order');

  try {
    const result = await graphqlMutation<
      CompleteCartMutation,
      CompleteCartMutationVariables
    >({
      mutation: COMPLETE_CART_MUTATION,
      variables: { cartId: id },
      context: {
        headers: {
          ...getAuthHeaders(ctx),
        },
      },
    });

    const completed = result?.completeCart;

    if (!completed) {
      throw new Error('No result returned from completeCart mutation');
    }

    if (completed.__typename === 'CompleteCartOrderResult') {
      const order = completed.order;
      const countryCode =
        order?.shippingAddress?.countryCode?.toLowerCase() ?? 'us';

      const orderCacheTag = getCacheTag('orders', ctx);
      revalidateTag(orderCacheTag);

      await removeCartIdAction();
      redirect(`/${countryCode}/order/${order?.id}/confirmed`);

      return order;
    }

    if (completed.__typename === 'CompleteCartErrorResult') {
      console.error(
        'Cart completion failed:',
        completed.error?.message || 'Unknown error'
      );

      const cartCacheTag = getCacheTag('carts', ctx);
      revalidateTag(cartCacheTag);

      return completed.cart;
    }

    return null;
  } catch (error: any) {
    console.error('GraphQL completeCart error:', error.message);
    throw error;
  }
}

/**
 * Updates the countrycode param and revalidates the regions cache
 * @param regionId
 * @param countryCode
 */
export async function updateRegion(
  countryCode: string,
  currentPath: string,
  ctx: StorefrontContext
) {
  const cartId = getCartId(ctx);
  const region = await getRegion(countryCode, ctx);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (cartId) {
    await updateCart({ regionId: region.id }, ctx);
    const cartCacheTag = getCacheTag('carts', ctx);
    revalidateTag(cartCacheTag);
  }

  const regionCacheTag = getCacheTag('regions', ctx);
  revalidateTag(regionCacheTag);

  const productsCacheTag = getCacheTag('products', ctx);
  revalidateTag(productsCacheTag);

  redirect(`/${countryCode}${currentPath}`);
}

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

import { revalidateTag } from 'next/cache';

import {
  TransferCartMutation,
  TransferCartMutationVariables,
} from '@/types/graphql';

import { graphqlMutation } from '../gql/apollo-client';
import { TRANSFER_CART_MUTATION } from '../gql/mutations/cart';
import { medusaError } from '../utils/medusa-error';
import { getCacheTag, getCartId } from './cookies';

export const transferCart = async (): Promise<
  TransferCartMutation['transferCart'] | null
> => {
  const cartId = await getCartId();

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

    if (cart) {
      const cartCacheTag = await getCacheTag('carts');
      revalidateTag(cartCacheTag);
    }

    return cart;
  } catch (err) {
    medusaError(err);
  }
};

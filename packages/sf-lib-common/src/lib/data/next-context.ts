'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { updateCart } from './cart';
import { StorefrontContext } from './context';
import { getCacheTag, getCartId } from './cookies-utils';
import { getRegion } from './regions';

export const resolveNextContext = async (): Promise<StorefrontContext> => {
  const cookieStore = await cookies();

  return {
    cartId: cookieStore.get('_medusa_cart_id')?.value ?? '',
    customerToken: cookieStore.get('_medusa_jwt')?.value ?? '',
    cacheId: cookieStore.get('_medusa_cache_id')?.value ?? '',
    cookieHeader: cookieStore.toString(),
  };
};

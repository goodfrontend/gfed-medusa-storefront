'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { updateCart } from './cart';
import { StorefrontContext } from './context';
import { getCacheTag, getCartId } from './cookies';
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

export async function updateRegionAction(
  countryCode: string,
  currentPath: string
) {
  const ctx = await resolveNextContext();
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

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

export async function updateRegionAction(
  countryCode: string,
  currentPath: string,
  ctx?: StorefrontContext
) {
  const context = ctx || (await resolveNextContext());
  const cartId = getCartId(context);
  const region = await getRegion(countryCode, context);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (cartId) {
    await updateCart({ regionId: region.id }, context);
    const cartCacheTag = getCacheTag('carts', context);
    revalidateTag(cartCacheTag);
  }

  const regionCacheTag = getCacheTag('regions', context);
  revalidateTag(regionCacheTag);

  const productsCacheTag = getCacheTag('products', context);
  revalidateTag(productsCacheTag);

  redirect(`/${countryCode}${currentPath}`);
}

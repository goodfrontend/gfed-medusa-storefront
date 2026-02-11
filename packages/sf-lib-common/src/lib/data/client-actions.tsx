'use client';

import { updateCart } from './cart';
import { StorefrontContext } from './context';
import {
  removeAuthTokenAction,
  removeCartIdAction,
  setAuthTokenAction,
  setCartIdAction,
} from './cookies-actions';
import { getCartId } from './cookies-utils';
import { getRegion } from './regions';

async function updateRegion(
  countryCode: string,
  currentPath: string,
  ctx: StorefrontContext
) {
  const region = await getRegion(countryCode, ctx);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  const cartId = getCartId(ctx);
  if (cartId) {
    await updateCart({ regionId: region.id }, ctx);
  }

  window.location.href = `/${countryCode}${currentPath}`;
}

export const useStorefrontActions = (ctx?: StorefrontContext) => {
  return {
    setCartId: setCartIdAction,
    removeCartId: removeCartIdAction,
    setAuthToken: setAuthTokenAction,
    removeAuthToken: removeAuthTokenAction,
    updateRegion: ((countryCode: string, currentPath: string) =>
      updateRegion(countryCode, currentPath, ctx!)) as (
      countryCode: string,
      currentPath: string
    ) => Promise<void>,
  };
};

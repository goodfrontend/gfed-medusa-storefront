'use client';

import { StorefrontContext } from './context';
import {
  removeAuthTokenAction,
  removeCartIdAction,
  setAuthTokenAction,
  setCartIdAction,
} from './cookies';
import { updateRegionAction } from './next-context';

export const useStorefrontActions = (ctx?: StorefrontContext) => {
  return {
    setCartId: setCartIdAction,
    removeCartId: removeCartIdAction,
    setAuthToken: setAuthTokenAction,
    removeAuthToken: removeAuthTokenAction,
    updateRegion: ((countryCode: string, currentPath: string) =>
      updateRegionAction(countryCode, currentPath, ctx)) as (
      countryCode: string,
      currentPath: string
    ) => Promise<void>,
  };
};

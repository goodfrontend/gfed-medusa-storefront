'use client';

import {
  removeAuthTokenAction,
  removeCartIdAction,
  setAuthTokenAction,
  setCartIdAction,
} from './cookies';
import { updateRegionAction } from './next-context';

export const useStorefrontActions = () => {
  return {
    setCartId: setCartIdAction,
    removeCartId: removeCartIdAction,
    setAuthToken: setAuthTokenAction,
    removeAuthToken: removeAuthTokenAction,
    updateRegion: updateRegionAction,
  };
};

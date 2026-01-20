'use client';

import { type ReactNode, createContext, useContext } from 'react';

export interface StorefrontContext {
  cartId?: string;
  customerToken?: string;
  cacheId?: string;
  cookieHeader?: string;
  revalidate?: (tag: string) => void;
  updateRegion?: (countryCode: string, currentPath: string) => Promise<void>;
  setCartId?: (id: string) => Promise<void>;
  removeCartId?: () => Promise<void>;
  setAuthToken?: (token: string) => Promise<void>;
  removeAuthToken?: () => Promise<void>;
}

export const getEmptyContext = (): StorefrontContext => ({});

const StorefrontReactContext =
  createContext<StorefrontContext>(getEmptyContext());

export const StorefrontProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: StorefrontContext;
}) => {
  return (
    <StorefrontReactContext.Provider value={value}>
      {children}
    </StorefrontReactContext.Provider>
  );
};

export const useStorefrontContext = () => useContext(StorefrontReactContext);

'use client';

import { type ReactNode, createContext, useContext } from 'react';

export interface StorefrontContext {
  cartId: string;
  customerToken: string;
  cacheId: string;
  cookieHeader: string;
  revalidate?: (tag: string) => void;
}

const StorefrontReactContext = createContext<StorefrontContext>(
  {} as StorefrontContext
);

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
export { useStorefrontActions } from './client-actions';

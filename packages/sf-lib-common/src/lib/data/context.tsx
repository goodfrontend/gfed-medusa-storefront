'use client';

import { type ReactNode, createContext, useContext } from 'react';

import useSWR from 'swr';

export interface StorefrontContext {
  cartId: string;
  cacheId: string;
  cookieHeader?: string;
}

interface ClientContext {
  cartId: string;
  cacheId: string;
}

const StorefrontReactContext = createContext<StorefrontContext>({
  cartId: '',
  cacheId: '',
});

const fetchContext = async (): Promise<ClientContext> => {
  const response = await fetch('/api/context', {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch context');
  }

  return response.json();
};

interface StorefrontProviderProps {
  children: ReactNode;
  value?: StorefrontContext;
}

export const StorefrontProvider = ({
  children,
  value,
}: StorefrontProviderProps) => {
  // If value is provided (host apps), use it directly
  // If no value (horizontal components), fetch from API
  const { data: fetchedContext } = useSWR<ClientContext>(
    value ? null : 'storefront-context',
    fetchContext,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const contextValue: StorefrontContext = value ?? {
    cartId: fetchedContext?.cartId ?? '',
    cacheId: fetchedContext?.cacheId ?? '',
  };

  return (
    <StorefrontReactContext.Provider value={contextValue}>
      {children}
    </StorefrontReactContext.Provider>
  );
};

export const useStorefrontContext = () => useContext(StorefrontReactContext);
export { useStorefrontActions } from './client-actions';

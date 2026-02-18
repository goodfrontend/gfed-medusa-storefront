'use client';

import useSWR, { mutate } from 'swr';

import { Cart } from '../../types/graphql';

const CART_SWR_KEY = 'medusa-cart';

export const useCart = () => {
  const {
    data,
    error,
    isLoading,
    mutate: swrMutate,
  } = useSWR<Cart | null>(
    CART_SWR_KEY,
    async () => {
      const response = await fetch('/api/cart', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const { cart } = await response.json();
      return cart;
    },
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    cart: data,
    error,
    isLoading,
    mutate: swrMutate,
  };
};

export const mutateCart = () => {
  return mutate(CART_SWR_KEY);
};

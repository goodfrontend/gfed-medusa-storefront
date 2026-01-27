import useSWR, { mutate } from 'swr';

import { Cart } from '../../types/graphql';
import { retrieveCart } from '../data/cart';
import { useStorefrontContext } from '../data/context';

export const CART_SWR_KEY = 'medusa-cart';

export const useCart = () => {
  const ctx = useStorefrontContext();

  const {
    data,
    error,
    isLoading,
    mutate: swrMutate,
  } = useSWR<Cart | null>(CART_SWR_KEY, () => retrieveCart(ctx), {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

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

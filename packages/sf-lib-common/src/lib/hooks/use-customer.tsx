'use client';

import useSWR from 'swr';

import { Customer } from '../../types/graphql';

const CUSTOMER_SWR_KEY = 'medusa-customer';

export const useCustomer = () => {
  const {
    data,
    error,
    isLoading,
    mutate: swrMutate,
  } = useSWR<Customer | null>(
    CUSTOMER_SWR_KEY,
    async () => {
      const response = await fetch('/api/customer', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer');
      }

      const { customer } = await response.json();

      return customer;
    },
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    customer: data,
    error,
    isLoading,
    mutate: swrMutate,
  };
};

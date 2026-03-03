'use client';

import useSWR from 'swr';

import { graphqlFetch } from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';

import { GET_PRODUCT_PRICING_QUERY } from '@/lib/gql/queries/product';
import type { GetProductPricingQuery, GetProductPricingQueryVariables } from '@/types/graphql';

export function useProductPrice(productId?: string, regionId?: string) {
  const key =
    productId && regionId ? ['product-price', productId, regionId] : null;

  const { data, error, isLoading } = useSWR(
    key,
    async () => {
      const res = await graphqlFetch<GetProductPricingQuery, GetProductPricingQueryVariables>({
        query: GET_PRODUCT_PRICING_QUERY,
        variables: {
          id: productId ?? '',
          region_id: regionId,
        },
      });

      return { product: res?.product ?? null };
    },
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    product: data?.product ?? null,
    isLoading,
    error,
  };
}

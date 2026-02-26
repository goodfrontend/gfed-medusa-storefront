'use server';

import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';

import {
  createServerApolloClient,
  graphqlFetch,
  graphqlMutation,
} from '@/lib/gql/apollo-client';
import {
  CalculateShippingOptionPriceMutation,
  CalculateShippingOptionPriceMutationVariables,
  GetShippingOptionsQuery,
  GetShippingOptionsQueryVariables,
  ShippingOption,
} from '@/lib/gql/generated-types/graphql';
import { CALCULATE_SHIPPING_OPTION_PRICE_MUTATION } from '@/lib/gql/mutations/fulfillment';
import { GET_SHIPPING_OPTIONS_QUERY } from '@/lib/gql/queries/fulfillment';

export const listCartShippingMethods = async (
  cartId: string,
  ctx: StorefrontContext
): Promise<ShippingOption[] | null> => {
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');
  try {
    const data = await graphqlFetch<
      GetShippingOptionsQuery,
      GetShippingOptionsQueryVariables
    >(
      { query: GET_SHIPPING_OPTIONS_QUERY, variables: { cartId } },
      apolloClient
    );
    return (data?.shippingOptions?.filter(Boolean) as ShippingOption[]) ?? null;
  } catch {
    return null;
  }
};

export const calculatePriceForShippingOption = async (
  optionId: string,
  cartId: string,
  data: Record<string, unknown> = {},
  ctx: StorefrontContext
): Promise<ShippingOption | null> => {
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');
  try {
    const result = await graphqlMutation<
      CalculateShippingOptionPriceMutation,
      CalculateShippingOptionPriceMutationVariables
    >(
      {
        mutation: CALCULATE_SHIPPING_OPTION_PRICE_MUTATION,
        variables: { optionId, cartId, data },
      },
      apolloClient
    );
    return result?.calculateShippingOptionPrice ?? null;
  } catch {
    return null;
  }
};

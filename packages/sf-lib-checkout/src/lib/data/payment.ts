'use server';

import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';

import {
  createServerApolloClient,
  graphqlFetch,
} from '@/lib/gql/apollo-client';
import {
  GetPaymentProvidersQuery,
  GetPaymentProvidersQueryVariables,
  PaymentProviders,
} from '@/lib/gql/generated-types/graphql';
import { GET_PAYMENT_PROVIDERS_QUERY } from '@/lib/gql/queries/payment';

export const listCartPaymentMethods = async (
  regionId: string,
  ctx: StorefrontContext
): Promise<PaymentProviders[]> => {
  if (!regionId) {
    return [];
  }

  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');
  try {
    const data = await graphqlFetch<
      GetPaymentProvidersQuery,
      GetPaymentProvidersQueryVariables
    >(
      { query: GET_PAYMENT_PROVIDERS_QUERY, variables: { regionId } },
      apolloClient
    );
    const paymentProviders = data?.paymentProviders ?? [];
    return [...paymentProviders].sort((a, b) =>
      (a?.id ?? '').localeCompare(b?.id ?? '')
    );
  } catch (error) {
    console.error('Failed to fetch payment providers:', error);
    return [];
  }
};

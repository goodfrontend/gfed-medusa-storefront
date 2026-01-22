'use server';

import { sdk } from '@gfed-medusa/sf-lib-common/lib/config/medusa';
import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import {
  getAuthHeaders,
  getCacheOptions,
} from '@gfed-medusa/sf-lib-common/lib/data/cookies';
import { HttpTypes } from '@medusajs/types';

export const listCartPaymentMethods = async (
  regionId: string,
  ctx: StorefrontContext
) => {
  const headers = {
    ...getAuthHeaders(ctx),
  };

  const next = {
    ...getCacheOptions('payment_providers', ctx),
  };

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(
      `/store/payment-providers`,
      {
        method: 'GET',
        query: { region_id: regionId },
        headers,
        next,
        cache: 'force-cache',
      }
    )
    .then(({ payment_providers }) =>
      payment_providers.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      })
    )
    .catch(() => {
      return null;
    });
};

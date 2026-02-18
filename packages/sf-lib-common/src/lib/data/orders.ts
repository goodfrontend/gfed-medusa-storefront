import { HttpTypes } from '@medusajs/types';

import { sdk } from '../config/medusa';
import { medusaError } from '../utils/medusa-error';
import { normalizeOrder } from '../utils/normalize-functions';
import { StorefrontContext } from './context';
import { getCacheOptions } from './cookies-utils';

export const retrieveOrder = async (id: string, ctx: StorefrontContext) => {
  const next = {
    ...getCacheOptions('orders', ctx),
  };

  return sdk.client
    .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
      method: 'GET',
      query: {
        fields:
          '*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product',
      },
      next,
      cache: 'force-cache',
    })
    .then(({ order }) => order && normalizeOrder(order))
    .catch((err) => medusaError(err));
};

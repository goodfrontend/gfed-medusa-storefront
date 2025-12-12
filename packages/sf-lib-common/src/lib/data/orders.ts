import { HttpTypes } from '@medusajs/types';

import { sdk } from '../config/medusa';
import { medusaError } from '../utils/medusa-error';
import { normalizeOrder } from '../utils/normalize-functions';
import { getAuthHeaders, getCacheOptions } from './cookies';

export const retrieveOrder = async (id: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions('orders')),
  };

  return sdk.client
    .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
      method: 'GET',
      query: {
        fields:
          '*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product',
      },
      headers,
      next,
      cache: 'force-cache',
    })
    .then(({ order }) => order && normalizeOrder(order))
    .catch((err) => medusaError(err));
};

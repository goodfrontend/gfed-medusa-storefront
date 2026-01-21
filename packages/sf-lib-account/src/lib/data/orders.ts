'use server';

import { sdk } from '@gfed-medusa/sf-lib-common/lib/config/medusa';
import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import {
  getAuthHeaders,
  getCacheOptions,
} from '@gfed-medusa/sf-lib-common/lib/data/cookies';
import { medusaError } from '@gfed-medusa/sf-lib-common/lib/utils/medusa-error';
import { normalizeOrder } from '@gfed-medusa/sf-lib-common/lib/utils/normalize-functions';
import { HttpTypes } from '@medusajs/types';

export const createTransferRequest = async (
  state: {
    success: boolean;
    error: string | null;
    order: HttpTypes.StoreOrder | null;
  },
  formData: FormData,
  ctx: StorefrontContext = {}
): Promise<{
  success: boolean;
  error: string | null;
  order: HttpTypes.StoreOrder | null;
}> => {
  const id = formData.get('order_id') as string;

  if (!id) {
    return { success: false, error: 'Order ID is required', order: null };
  }

  const headers = getAuthHeaders(ctx);

  return await sdk.store.order
    .requestTransfer(
      id,
      {},
      {
        fields: 'id, email',
      },
      headers
    )
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }));
};

export const listOrders = async (
  limit: number = 10,
  offset: number = 0,
  filters?: Record<string, any>,
  ctx: StorefrontContext = {}
) => {
  const headers = {
    ...getAuthHeaders(ctx),
  };

  const next = {
    ...getCacheOptions('orders', ctx),
  };

  return sdk.client
    .fetch<HttpTypes.StoreOrderListResponse>(`/store/orders`, {
      method: 'GET',
      query: {
        limit,
        offset,
        order: '-created_at',
        fields: '*items,+items.metadata,*items.variant,*items.product',
        ...filters,
      },
      headers,
      next,
      cache: 'force-cache',
    })
    .then(({ orders }) => orders.map(normalizeOrder))
    .catch((err) => medusaError(err));
};

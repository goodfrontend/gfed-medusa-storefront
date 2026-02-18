'use server';

import { sdk } from '@gfed-medusa/sf-lib-common/lib/config/medusa';
import { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { getCacheOptions } from '@gfed-medusa/sf-lib-common/lib/data/cookies-utils';
import { HttpTypes } from '@medusajs/types';

export const listCartShippingMethods = async (
  cartId: string,
  ctx: StorefrontContext
) => {
  const next = {
    ...getCacheOptions('fulfillment', ctx),
  };

  return sdk.client
    .fetch<HttpTypes.StoreShippingOptionListResponse>(
      `/store/shipping-options`,
      {
        method: 'GET',
        query: {
          cart_id: cartId,
          fields:
            '+service_zone.fulfllment_set.type,*service_zone.fulfillment_set.location.address',
        },
        next,
        cache: 'force-cache',
      }
    )
    .then(({ shipping_options }) => shipping_options)
    .catch(() => {
      return null;
    });
};

export const calculatePriceForShippingOption = async (
  optionId: string,
  cartId: string,
  data: Record<string, unknown> = {},
  ctx: StorefrontContext
) => {
  const next = {
    ...getCacheOptions('fulfillment', ctx),
  };

  const body = { cart_id: cartId, data };

  if (data) {
    body.data = data;
  }

  return sdk.client
    .fetch<{ shipping_option: HttpTypes.StoreCartShippingOption }>(
      `/store/shipping-options/${optionId}/calculate`,
      {
        method: 'POST',
        body,
        next,
      }
    )
    .then(({ shipping_option }) => shipping_option)
    .catch((e) => {
      return null;
    });
};

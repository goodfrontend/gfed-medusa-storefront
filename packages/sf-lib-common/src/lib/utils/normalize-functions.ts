// TODO: To be removed once Order and Region resolvers are implemented, the normalizers will then be used within the resolvers themselves
import { HttpTypes } from '@medusajs/types';

import { Order, Region } from '@/types/graphql';

export const normalizeRegion = (region: HttpTypes.StoreRegion): Region => ({
  id: region.id,
  name: region.name,
  currencyCode: region.currency_code,
  countries:
    region.countries?.map((c) => ({
      iso2: c.iso_2,
      name: c.name,
    })) ?? [],
  createdAt: region.created_at,
});

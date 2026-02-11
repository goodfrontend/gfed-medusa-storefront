'use server';

import { sdk } from '@gfed-medusa/sf-lib-common/lib/config/medusa';
import type { StorefrontContext } from '@gfed-medusa/sf-lib-common/lib/data/context';
import { getCacheOptions } from '@gfed-medusa/sf-lib-common/lib/data/cookies-utils';
import { medusaError } from '@gfed-medusa/sf-lib-common/lib/utils/medusa-error';
import { normalizeRegion } from '@gfed-medusa/sf-lib-common/lib/utils/normalize-functions';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';
import { HttpTypes } from '@medusajs/types';

export const listRegions = async (ctx: StorefrontContext) => {
  const next = {
    ...getCacheOptions('regions', ctx),
  };

  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: 'GET',
      next,
      cache: 'force-cache',
    })
    .then(({ regions }) => regions.map(normalizeRegion))
    .catch(medusaError);
};

const regionMap = new Map<string, Region>();

export const getRegion = async (
  countryCode: string,
  ctx: StorefrontContext
): Promise<Region | null> => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode) ?? null;
    }

    const regions = await listRegions(ctx);

    if (!regions) return null;

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso2 ?? '', region);
      });
    });

    const region = countryCode
      ? (regionMap.get(countryCode) ?? null)
      : (regionMap.get('us') ?? null);

    return region;
  } catch {
    return null;
  }
};

'use server';

import { sdk } from '@gfed-medusa/sf-lib-common/lib/config/medusa';
import { medusaError } from '@gfed-medusa/sf-lib-common/lib/utils/medusa-error';
import { normalizeRegion } from '@gfed-medusa/sf-lib-common/lib/utils/normalize-functions';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';
import { HttpTypes } from '@medusajs/types';

import { getCacheOptions } from './cookies';

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions('regions')),
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
  countryCode: string
): Promise<Region | null> => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode) ?? null;
    }

    const regions = await listRegions();

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

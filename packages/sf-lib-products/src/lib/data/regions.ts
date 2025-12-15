'use server';

import { sdk } from '@gfed-medusa/sf-lib-common/lib/config/medusa';
import { getCacheOptions } from '@gfed-medusa/sf-lib-common/lib/data/cookies';
import { listRegions } from '@gfed-medusa/sf-lib-common/lib/data/regions';
import { medusaError } from '@gfed-medusa/sf-lib-common/lib/utils/medusa-error';
import { normalizeRegion } from '@gfed-medusa/sf-lib-common/lib/utils/normalize-functions';
import { Region } from '@gfed-medusa/sf-lib-common/types/graphql';
import { HttpTypes } from '@medusajs/types';

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(['regions', id].join('-'))),
  };

  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: 'GET',
      next,
      cache: 'force-cache',
    })
    .then(({ region }) => (region ? normalizeRegion(region) : null))
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
  } catch (e: any) {
    return null;
  }
};

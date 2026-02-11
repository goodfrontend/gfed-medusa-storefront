import { HttpTypes } from '@medusajs/types';

import { Region } from '../../types/graphql';
import { sdk } from '../config/medusa';
import { medusaError } from '../utils/medusa-error';
import { normalizeRegion } from '../utils/normalize-functions';
import type { StorefrontContext } from './context';
import { getCacheOptions } from './cookies-utils';

const regionMap = new Map<string, Region>();

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
  } catch (e: any) {
    return null;
  }
};

'use server';

import { sdk } from '@lib/config';
import { Region } from '@lib/gql/generated-types/graphql';
import medusaError from '@lib/util/medusa-error';
import { normalizeRegion } from '@lib/util/normalizeFunctions';
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

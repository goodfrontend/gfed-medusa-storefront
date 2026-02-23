import type { Region } from '../../types/graphql';
import {
  createServerApolloClient,
  graphqlFetch,
} from '../gql/apollo-client';
import { GET_REGION_QUERY, LIST_REGIONS_QUERY } from '../gql/queries/regions';
import { medusaError } from '../utils/medusa-error';
import type { StorefrontContext } from './context';

// Inline types until codegen generates ListRegionsQuery / GetRegionQuery
type ListRegionsResult = { regions: Region[] };
type GetRegionResult = { region: Region | null };

const regionMap = new Map<string, Region>();

export const listRegions = async (ctx: StorefrontContext) => {
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');

  return graphqlFetch<ListRegionsResult, Record<string, never>>(
    { query: LIST_REGIONS_QUERY, fetchPolicy: 'cache-first' },
    apolloClient
  )
    .then((data) => data?.regions ?? [])
    .catch(medusaError);
};

export const retrieveRegion = async (id: string, ctx: StorefrontContext) => {
  const apolloClient = createServerApolloClient(ctx.cookieHeader ?? '');

  return graphqlFetch<GetRegionResult, { id: string }>(
    { query: GET_REGION_QUERY, variables: { id }, fetchPolicy: 'cache-first' },
    apolloClient
  )
    .then((data) => data?.region ?? null)
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
  } catch {
    return null;
  }
};

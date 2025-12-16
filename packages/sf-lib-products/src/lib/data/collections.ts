'use server';

import {
  GET_COLLECTIONS_QUERY,
  GET_COLLECTIONS_SUMMARY_QUERY,
  GET_COLLECTION_QUERY,
} from '@/lib/gql/queries/product';
import { graphqlFetch } from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import type {
  GetCollectionQuery,
  GetCollectionQueryVariables,
  GetCollectionsQuery,
  GetCollectionsQueryVariables,
  GetCollectionsSummaryQuery,
  GetCollectionsSummaryQueryVariables,
} from '@/types/graphql';

export const retrieveCollection = async (id: string) => {
  try {
    const data = await graphqlFetch<
      GetCollectionQuery,
      GetCollectionQueryVariables
    >({ query: GET_COLLECTION_QUERY, variables: { id } });

    return data?.collection || null;
  } catch (error) {
    console.error('Error fetching collection from BFF:', error);
    return null;
  }
};

export const listCollections = async (
  queryParams: Record<string, string> = {}
) => {
  try {
    const limit = parseInt(queryParams.limit || '100');
    const offset = parseInt(queryParams.offset || '0');

    const data = await graphqlFetch<
      GetCollectionsQuery,
      GetCollectionsQueryVariables
    >({
      query: GET_COLLECTIONS_QUERY,
      variables: { limit, offset },
    });

    return {
      collections: data?.collections,
    };
  } catch (error) {
    console.error('Error fetching collections from BFF:', error);
    return { collections: [] };
  }
};

export const getCollectionByHandle = async (handle: string) => {
  try {
    const data = await graphqlFetch<
      GetCollectionsSummaryQuery,
      GetCollectionsSummaryQueryVariables
    >({
      query: GET_COLLECTIONS_SUMMARY_QUERY,
      variables: { handle: [handle] },
    });

    const collections = data?.collections || [];
    return collections.length > 0 ? collections[0] : null;
  } catch (error) {
    console.error('Error fetching collection by handle from BFF:', error);
    return null;
  }
};

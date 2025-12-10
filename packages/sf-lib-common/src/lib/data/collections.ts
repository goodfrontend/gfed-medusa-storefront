'use server';

import { graphqlFetch } from '@/lib/gql/apollo-client';
import { GET_COLLECTIONS_QUERY } from '@/lib/gql/queries/collections';
import {
  GetCollectionsQuery,
  GetCollectionsQueryVariables,
} from '@/types/graphql';

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

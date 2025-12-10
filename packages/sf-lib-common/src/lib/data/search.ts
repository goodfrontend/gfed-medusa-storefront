'use server';

import { graphqlFetch } from '@/lib/gql/apollo-client';
import { SEARCH_SUGGESTIONS_QUERY } from '@/lib/gql/queries/product';
import {
  ProductHit,
  SearchSuggestionsQuery,
  SearchSuggestionsQueryVariables,
} from '@/types/graphql';

export const searchSuggestions = async (
  params: SearchSuggestionsQueryVariables
): Promise<{ items: ProductHit[] }> => {
  try {
    const response = await graphqlFetch<
      SearchSuggestionsQuery,
      SearchSuggestionsQueryVariables
    >({
      query: SEARCH_SUGGESTIONS_QUERY,
      variables: {
        query: params.query,
      },
    });

    if (!response?.searchProducts) {
      throw new Error('No search results returned');
    }

    return response.searchProducts;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error(
      `Failed to search suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

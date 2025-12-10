import { graphqlFetch } from '@/lib/gql/apollo-client';
import { GET_PRODUCT_CATEGORIES_QUERY } from '@/lib/gql/queries/product';
import {
  GetProductCategoriesQuery,
  GetProductCategoriesQueryVariables,
} from '@/types/graphql';

export const listCategories = async () => {
  try {
    const data = await graphqlFetch<
      GetProductCategoriesQuery,
      GetProductCategoriesQueryVariables
    >({
      query: GET_PRODUCT_CATEGORIES_QUERY,
    });

    return data?.productCategories || [];
  } catch (error) {
    console.error('Error fetching categories from BFF:', error);
    return [];
  }
};

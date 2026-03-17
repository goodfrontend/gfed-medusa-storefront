import { graphqlFetch } from '@/lib/gql/apollo-client';
import { GET_PRODUCT_CATEGORIES_QUERY } from '@/lib/gql/queries/product';
import {
  GetProductCategoriesQueryVariables,
  ProductCategory,
} from '@/types/graphql';

export type ListCategoryItem = Pick<ProductCategory, 'id' | 'name' | 'handle'>;

type ListCategoriesResult = {
  productCategories: ListCategoryItem[];
};

export const listCategories = async (
  queryParams: GetProductCategoriesQueryVariables = {}
): Promise<ListCategoryItem[]> => {
  try {
    const data = await graphqlFetch<
      ListCategoriesResult,
      GetProductCategoriesQueryVariables
    >({
      query: GET_PRODUCT_CATEGORIES_QUERY,
      variables: queryParams,
    });

    return data?.productCategories || [];
  } catch (error) {
    console.error('Error fetching categories from BFF:', error);
    return [];
  }
};

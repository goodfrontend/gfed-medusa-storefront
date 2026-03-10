import { graphqlFetch } from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';

import { GET_PRODUCT_CATEGORIES_QUERY } from '@/lib/gql/queries/product';
import type { GetProductCategoriesQueryVariables } from '@/types/graphql';

type ProductCategorySummary = {
  id: string;
  name: string;
  description?: string | null;
};

export const listCategories = async () => {
  try {
    const data = await graphqlFetch<
      { productCategories?: Array<ProductCategorySummary | null> | null },
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

export const getCategoryByHandle = async (handle: string[]) => {
  try {
    const data = await graphqlFetch<
      { productCategories?: Array<ProductCategorySummary | null> | null },
      GetProductCategoriesQueryVariables
    >({
      query: GET_PRODUCT_CATEGORIES_QUERY,
      variables: {
        handle: handle[0],
      },
    });

    return data?.productCategories?.[0] || null;
  } catch (error) {
    console.error('Error fetching category by handle from BFF:', error);
    return null;
  }
};

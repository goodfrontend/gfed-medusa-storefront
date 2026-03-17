import { gql } from '@apollo/client';

import {
  listCategories,
  type ListCategoryItem,
} from '@gfed-medusa/sf-lib-common/lib/data/categories';
import { resolveNextContext } from '@gfed-medusa/sf-lib-common/lib/data/next-context';
import { getRegion } from '@gfed-medusa/sf-lib-common/lib/data/regions';
import { graphqlFetch } from '@gfed-medusa/sf-lib-common/lib/gql/apollo-client';
import type { Product } from '@gfed-medusa/sf-lib-common/types/graphql';

const FEATURED_PRODUCTS_LIMIT = 3;

const FEATURED_CATEGORY_SELECTORS = [
  {
    matches: ['mens', 'men'],
    title: "Men's",
  },
  {
    matches: ['womens', 'women'],
    title: "Women's",
  },
] as const;

type FeaturedCategory = {
  category: ListCategoryItem;
  products: FeaturedProduct[];
  title: string;
};

type FeaturedCategorySelection = {
  category: ListCategoryItem;
  title: (typeof FEATURED_CATEGORY_SELECTORS)[number]['title'];
};

const normalizeCategoryValue = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '');

type FeaturedProduct = Pick<
  Product,
  'id' | 'title' | 'handle' | 'thumbnail' | 'images' | 'variants'
>;

type GetFeaturedProductsQueryVariables = {
  category_id: string[];
  is_giftcard: boolean;
  limit: number;
  order: string;
  region_id: string;
};

type GetFeaturedProductsQuery = {
  products?: {
    products?: Array<FeaturedProduct | null> | null;
  } | null;
};

const GET_FEATURED_PRODUCTS_QUERY = gql`
  query GetFeaturedProducts(
    $category_id: [String]
    $is_giftcard: Boolean
    $limit: Int
    $order: String
    $region_id: String
  ) {
    products(
      category_id: $category_id
      is_giftcard: $is_giftcard
      limit: $limit
      order: $order
      region_id: $region_id
    ) {
      products {
        id
        title
        handle
        thumbnail
      }
    }
  }
`;

const findMatchingCategory = (
  categories: ListCategoryItem[],
  matches: readonly string[]
) => {
  const normalizedMatches = new Set(
    matches.map((match) => normalizeCategoryValue(match))
  );

  return categories.find((category) => {
    const normalizedHandle = normalizeCategoryValue(category.handle);
    const normalizedName = normalizeCategoryValue(category.name);

    return (
      normalizedMatches.has(normalizedHandle) ||
      normalizedMatches.has(normalizedName)
    );
  });
};

export async function getFeaturedCategories(
  countryCode: string
): Promise<FeaturedCategory[]> {
  try {
    const ctx = await resolveNextContext();
    const [categories, region] = await Promise.all([
      listCategories(),
      getRegion(countryCode, ctx),
    ]);

    if (!region) {
      return [];
    }

    const featuredCategories = FEATURED_CATEGORY_SELECTORS.map((selector) => {
      const category = findMatchingCategory(categories, selector.matches);

      if (!category) {
        return null;
      }

      return {
        category,
        title: selector.title,
      };
    }).filter(
      (
        featuredCategory
      ): featuredCategory is FeaturedCategorySelection =>
        featuredCategory !== null
    );

    if (featuredCategories.length === 0) {
      return [];
    }

    const featuredCategoryProducts = await Promise.all(
      featuredCategories.map(async ({ category, title }) => {
        const data = await graphqlFetch<
          GetFeaturedProductsQuery,
          GetFeaturedProductsQueryVariables
        >({
          query: GET_FEATURED_PRODUCTS_QUERY,
          variables: {
            category_id: [category.id],
            is_giftcard: false,
            limit: FEATURED_PRODUCTS_LIMIT,
            order: '-created_at',
            region_id: region.id,
          },
        });

        return {
          category,
          products:
            data?.products?.products?.filter(
              (product): product is FeaturedProduct => Boolean(product)
            ) ?? [],
          title,
        };
      })
    );

    return featuredCategoryProducts.filter(
      ({ products }) => products.length > 0
    );
  } catch (error) {
    console.error('Error fetching featured categories from BFF:', error);
    return [];
  }
}

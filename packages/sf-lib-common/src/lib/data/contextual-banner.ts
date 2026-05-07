import { graphqlFetch } from '@/lib/gql/apollo-client';
import { GET_CONTEXTUAL_BANNERS_QUERY } from '@/lib/gql/queries/contextual-banner';

export interface ContextualBannerContent {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  trigger: string;
  minPrice?: number;
  isActive: boolean;
  priority: number;
}

type ContextualBannersQueryResult = {
  contextualBanners: ContextualBannerContent[];
};

export async function getAllContextualBanners(): Promise<ContextualBannerContent[]> {
  try {
    const data = await graphqlFetch<
      ContextualBannersQueryResult,
      Record<string, never>
    >({
      query: GET_CONTEXTUAL_BANNERS_QUERY,
      variables: {},
    });

    const banners = data?.contextualBanners ?? [];
    return banners.filter((b) => b.isActive);
  } catch (error) {
    console.error('Error fetching contextual banners:', error);
    return [];
  }
}
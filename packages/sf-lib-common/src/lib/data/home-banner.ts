import { graphqlFetch } from '@/lib/gql/apollo-client';
import { GET_HOME_BANNER_QUERY } from '@/lib/gql/queries/home-banner';
import { HomeBannerContent } from '@/types/cms';

type HomeBannerQueryResult = {
  homeBanner?: HomeBannerContent | null;
};

export const getHomeBannerContent = async () => {
  try {
    const data = await graphqlFetch<HomeBannerQueryResult, Record<string, never>>({
      query: GET_HOME_BANNER_QUERY,
    });

    return data?.homeBanner || null;
  } catch (error) {
    console.error('Error fetching home banner content:', error);
    return null;
  }
};

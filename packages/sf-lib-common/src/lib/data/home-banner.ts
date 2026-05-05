import { graphqlFetch } from '@/lib/gql/apollo-client';
import { GET_HOME_BANNER_QUERY } from '@/lib/gql/queries/home-banner';
import { HomeBannerContent } from '@/types/cms';

export interface HomeBannerParams {
  audience?: string;
  segment?: string;
}

type HomeBannerQueryVariables = {
  audience?: string | null;
  segment?: string | null;
};

type HomeBannerQueryResult = {
  homeBanner?: HomeBannerContent | null;
};

export const getHomeBannerContent = async (params?: HomeBannerParams) => {
  try {
    const data = await graphqlFetch<
      HomeBannerQueryResult,
      HomeBannerQueryVariables
    >({
      query: GET_HOME_BANNER_QUERY,
      variables: {
        audience: params?.audience ?? null,
        segment: params?.segment ?? null,
      },
    });

    return data?.homeBanner || null;
  } catch (error) {
    console.error('Error fetching home banner content:', error);
    return null;
  }
};

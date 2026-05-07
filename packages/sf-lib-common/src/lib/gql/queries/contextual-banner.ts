import { gql } from '@apollo/client';

export const GET_CONTEXTUAL_BANNERS_QUERY = gql`
  query GetContextualBanners {
    contextualBanners {
      title
      description
      ctaLabel
      ctaHref
      trigger
      minPrice
      isActive
      priority
    }
  }
`;
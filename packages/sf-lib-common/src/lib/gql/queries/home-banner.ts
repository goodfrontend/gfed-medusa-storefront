import { gql } from '@apollo/client';

export const GET_HOME_BANNER_QUERY = gql`
  query GetHomeBanner {
    homeBanner {
      _id
      _type
      eyebrow
      title
      description
      footerNote
      buttons {
        label
        href
        openInNewTab
      }
      secondaryBanners {
        title
        description
        image {
          alt
          asset {
            url
          }
        }
        button {
          label
          href
          openInNewTab
        }
      }
      image {
        alt
        asset {
          url
        }
      }
    }
  }
`;

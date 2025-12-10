import { gql } from '@apollo/client';

export const GET_FOOTER_QUERY = gql`
  query GetFooter {
    footer {
      storeName
      social {
        text
        url
      }
      copyright
      poweredByCta {
        text {
          ... on TextBlock {
            _key
            _type
            style
            children {
              _key
              text
              marks
            }
            markDefs {
              ... on LinkMark {
                _key
                _type
                href
                target
              }
              ... on IconLinkMark {
                _key
                _type
                href
                iconType
                iconClass
                iconFill
                iconComponent
                iconImage {
                  asset {
                    url
                  }
                  alt
                }
                iconUrl
                target
              }
            }
          }
          ... on ImageBlock {
            _key
            _type
            asset {
              url
            }
            alt
          }
          ... on FileBlock {
            _key
            _type
            asset {
              url
              originalFilename
              size
              mimeType
            }
          }
        }
      }
    }
  }
`;

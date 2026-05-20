import { StructureBuilder } from 'sanity/structure';

import { CogIcon } from '@sanity/icons';

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Home Page')
            .items([
              S.listItem()
                .title('Main Banner')
                .child(
                  S.document()
                    .schemaType('homeBanner')
                    .documentId('homeBannerId')
                    .title('Main Banner')
                ),
            ])
        ),
      S.listItem()
        .title('Navigation')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Navigation')
            .items([
              S.listItem()
                .title('Footer Content')
                .child(
                  S.document()
                    .schemaType('footer')
                    .documentId('footerId')
                    .title('Footer Content')
                ),
            ])
        ),
      S.listItem()
        .title('Personalization')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Personalization')
            .items([
              S.listItem()
                .title('Hero Banners')
                .child(
                  S.documentList()
                    .title('Hero Banners')
                    .filter('_type == "heroBanner"')
                ),
              S.listItem()
                .title('Promotional Banners')
                .child(
                  S.documentList()
                    .title('Promotional Banners')
                    .filter('_type == "promotionalBanner"')
                ),
              S.listItem()
                .title('Trust Badges')
                .child(
                  S.documentList()
                    .title('Trust Badges')
                    .filter('_type == "trustBadge"')
                ),
              S.listItem()
                .title('Category Tiles')
                .child(
                  S.documentList()
                    .title('Category Tiles')
                    .filter('_type == "categoryTile"')
                ),
              S.listItem()
                .title('Social Proof')
                .child(
                  S.documentList()
                    .title('Social Proof')
                    .filter('_type == "socialProof"')
                ),
              S.listItem()
                .title('Email Captures')
                .child(
                  S.documentList()
                    .title('Email Captures')
                    .filter('_type == "emailCapture"')
                ),
              S.listItem()
                .title('Urgency Banners')
                .child(
                  S.documentList()
                    .title('Urgency Banners')
                    .filter('_type == "urgencyBanner"')
                ),
            ])
        ),
    ]);

export default structure;

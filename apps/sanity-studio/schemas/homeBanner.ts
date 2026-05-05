import { defineArrayMember, defineField, defineType } from 'sanity';

const linkValidationMessage =
  'Use a relative path like /collections/new-arrivals or a full https:// URL.';
const bannerImageGuidance =
  'Prefer a wide JPG/WebP under roughly 500 KB. Avoid oversized PNGs when the image is purely photographic.';

const buildBannerLinkFields = () => [
  defineField({
    name: 'label',
    title: 'Label',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'href',
    title: 'Link',
    type: 'string',
    description: linkValidationMessage,
    validation: (Rule) =>
      Rule.required().custom((value) => {
        if (!value) return true;

        return /^(\/|https?:\/\/)/.test(value) ? true : linkValidationMessage;
      }),
  }),
  defineField({
    name: 'openInNewTab',
    title: 'Open in new tab',
    type: 'boolean',
  }),
];

const buildShowPoweredByField = () =>
  defineField({
    name: 'showPoweredBy',
    title: 'Show powered by text',
    type: 'boolean',
    description: 'Shows "Powered by Sanity CMS" at the bottom of the banner.',
    initialValue: false,
  });

export default defineType({
  name: 'homeBanner',
  title: 'Home Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'audienceString',
      description: 'Small label above the title.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'audienceString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'audienceText',
      rows: 3,
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      validation: (Rule) => Rule.max(2),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'bannerButton',
          title: 'Banner Button',
          fields: buildBannerLinkFields(),
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'secondaryBanners',
      title: 'Secondary banners',
      description:
        'Two smaller banners displayed below the main banner on desktop.',
      type: 'array',
      validation: (Rule) => Rule.max(2),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'secondaryBanner',
          title: 'Secondary Banner',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'audienceString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'audienceText',
              rows: 3,
            }),
            buildShowPoweredByField(),
            defineField({
              name: 'button',
              title: 'Button',
              type: 'object',
              validation: (Rule) => Rule.required(),
              fields: buildBannerLinkFields(),
            }),
            defineField({
              name: 'image',
              title: 'Background image',
              type: 'audienceImage',
              description: bannerImageGuidance,
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'title.default',
              subtitle: 'button.label',
              media: 'image.default',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'audienceImage',
      description: `Upload the sample at apps/mf-home/public/images/home-banner-sample.svg or replace it with your own artwork. ${bannerImageGuidance}`,
      options: {
        hotspot: true,
      },
    }),
    buildShowPoweredByField(),
  ],
  preview: {
    select: {
      title: 'title.default',
      showPoweredBy: 'showPoweredBy',
      media: 'image.default',
    },
    prepare({
      title,
      showPoweredBy,
      media,
    }: {
      title?: string;
      showPoweredBy?: boolean;
      media?: any;
    }) {
      return {
        title,
        subtitle: showPoweredBy ? 'Powered by note enabled' : undefined,
        media,
      };
    },
  },
});

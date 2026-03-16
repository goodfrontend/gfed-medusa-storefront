import { defineArrayMember, defineField, defineType } from 'sanity';

const linkValidationMessage =
  'Use a relative path like /collections/new-arrivals or a full https:// URL.';

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

        return /^(\/|https?:\/\/)/.test(value)
          ? true
          : linkValidationMessage;
      }),
  }),
  defineField({
    name: 'openInNewTab',
    title: 'Open in new tab',
    type: 'boolean',
  }),
];

export default defineType({
  name: 'homeBanner',
  title: 'Home Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the title.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
      description: 'Two smaller banners displayed below the main banner on desktop.',
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
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
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
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  description:
                    'Optional for decorative backgrounds, but useful if the image adds meaning.',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'button.label',
              media: 'image',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'Upload the sample at apps/mf-home/public/images/home-banner-sample.svg or replace it with your own artwork.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer note',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'footerNote',
      media: 'image',
    },
  },
});

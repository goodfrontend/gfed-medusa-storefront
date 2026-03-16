import { defineArrayMember, defineField, defineType } from 'sanity';

const linkValidationMessage =
  'Use a relative path like /collections/new-arrivals or a full https:// URL.';

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
          fields: [
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
          ],
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

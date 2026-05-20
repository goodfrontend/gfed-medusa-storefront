import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'promotionalBanner',
  title: 'Promotional Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'audienceString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'audienceString',
      description: 'Falls back to title if empty.',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'audienceText',
      rows: 2,
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'audienceString',
      description: 'Promo badge text (e.g., "40% OFF").',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'audienceImage',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'string',
      description: 'Which page surface this banner targets.',
      options: {
        list: [
          { title: 'Homepage Hero', value: 'homepage_hero' },
          { title: 'All Surfaces', value: '' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title.default',
      media: 'image.default',
    },
  },
});

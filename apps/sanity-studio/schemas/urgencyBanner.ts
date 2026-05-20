import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'urgencyBanner',
  title: 'Urgency Banner',
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
      description: 'The urgency message (e.g., "Limited-time offer — 40% off!"). Falls back to title.',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'audienceText',
      rows: 2,
      description: 'Supporting detail (e.g., "Ends in 2 hours").',
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'datetime',
      description: 'Optional expiration date/time for the offer.',
    }),
    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'string',
      description: 'Which page surface this targets. Leave empty for all.',
      options: {
        list: [
          { title: 'Homepage Hero', value: 'homepage_hero' },
          { title: 'Product Detail', value: 'product_detail' },
          { title: 'Cart Page', value: 'cart_page' },
          { title: 'All Surfaces', value: '' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title.default',
    },
  },
});

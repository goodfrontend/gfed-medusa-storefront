import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'socialProof',
  title: 'Social Proof',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'audienceString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'audienceText',
      rows: 2,
      description: 'The social proof message (e.g., "500+ people bought this today").',
    }),
    defineField({
      name: 'count',
      title: 'Count',
      type: 'number',
      description: 'Optional number to display (e.g., 500).',
    }),
    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'string',
      description: 'Which page surface this targets. Leave empty for all.',
      options: {
        list: [
          { title: 'Product Detail', value: 'product_detail' },
          { title: 'Checkout', value: 'checkout' },
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

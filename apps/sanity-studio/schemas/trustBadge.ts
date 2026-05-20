import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'trustBadge',
  title: 'Trust Badge',
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
      description: 'Headline message shown above badges.',
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'badge',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon', type: 'image', description: 'Small icon (e.g. shield, truck, lock). Recommended size: 32x32px.' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'string',
      description: 'Which page surface this targets. Leave empty for all.',
      options: {
        list: [
          { title: 'Checkout', value: 'checkout' },
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
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contextualBanner',
  title: 'Contextual Banner',
  type: 'document',
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
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      initialValue: 'Learn more',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Link',
      type: 'string',
      description: 'e.g., /returns-policy, /finance-options',
    }),
    defineField({
      name: 'trigger',
      title: 'Behavior Trigger',
      type: 'string',
      description: 'Signal that triggers this banner',
      options: {
        list: [
          { title: 'PDP Hesitation (Expensive)', value: 'pdp-hesitation' },
          { title: 'High Scroll No Action', value: 'high-scroll-no-action' },
          {
            title: 'Repeated Category View',
            value: 'repeated-category-view',
          },
          { title: 'Cart Abandonment Hint', value: 'cart-abandonment-hint' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'minPrice',
      title: 'Minimum Product Price',
      type: 'number',
      description: 'Only show for products at or above this price (USD)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher = shown first if multiple match',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'trigger',
    },
  },
});

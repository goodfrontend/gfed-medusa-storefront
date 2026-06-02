import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Large headline text. Falls back to title if empty.',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Small label displayed above the headline (e.g., "New Arrival").',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
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
      description: 'Which page surface this banner targets (e.g., homepage). Leave empty for all.',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'All Surfaces', value: '' },
        ],
      },
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'CSS background color override (e.g., #f3f4f6).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});

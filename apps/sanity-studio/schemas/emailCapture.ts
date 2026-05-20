import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'emailCapture',
  title: 'Email Capture',
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
      description: 'Large headline. Falls back to title if empty.',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'audienceText',
      rows: 2,
    }),
    defineField({
      name: 'incentive',
      title: 'Incentive',
      type: 'audienceString',
      description: 'The signup incentive (e.g., "Get 10% off your first order").',
    }),
    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'string',
      description: 'Which page surface this targets. Leave empty for all.',
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
    },
  },
});

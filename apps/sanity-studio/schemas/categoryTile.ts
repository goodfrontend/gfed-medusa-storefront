import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'categoryTile',
  title: 'Category Tile',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Category Slug',
      type: 'slug',
      description: 'The category handle (e.g., "mens").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'string',
      description: 'Which page surface this targets. Leave empty for all.',
      options: {
        list: [
          { title: 'Homepage Hero', value: 'homepage_hero' },
          { title: 'Category Page', value: 'category_page' },
          { title: 'All Surfaces', value: '' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});

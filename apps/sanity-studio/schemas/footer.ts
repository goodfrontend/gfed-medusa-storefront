import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer Content',
  type: 'document',
  fields: [
    defineField({
      name: 'storeName',
      title: 'Store Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'social',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
      validation: Rule => Rule.required()
            },{
              name: 'url',
              title: 'URL',
              type: 'url',
      validation: Rule => Rule.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'poweredByCta',
      title: 'Powered By Call to Action',
      type: 'partial.richText',
    })
  ],
  preview: {
    select: {
      title: 'storeName',
      subtitle: 'description'
    }
  }
})

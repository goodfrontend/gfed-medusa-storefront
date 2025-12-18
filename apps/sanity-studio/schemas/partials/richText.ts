
import { defineField, defineType } from 'sanity'

export const richText = defineType({
  type: 'document',
  name: 'partial.richText',
  title: 'Rich Text',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Heading 5', value: 'h5' },
            { title: 'Heading 6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Superscript', value: 'superscript' },
              { title: 'Subscript', value: 'subscript' },
            ],
            annotations: [
              {
                type: 'object',
                name: 'link',
                title: 'url',
                fields: [
                  defineField({
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    type: 'string',
                    name: 'target',
                    title: 'Target',
                    options: {
                      list: [
                        { value: '_blank', title: 'Blank' },
                        { value: '_parent', title: 'Parent' },
                      ],
                    },
                  }),
                ],
              },
              {
                type: 'object',
                name: 'iconlink',
                title: 'Icon Link',
                fields: [
                  defineField({
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    type: 'string',
                    name: 'iconType',
                    title: 'Icon Type',
                    options: {
                      list: [
                        { value: 'class', title: 'Icon Class/Name' },
                        { value: 'component', title: 'Icon Component' },
                        { value: 'sanity', title: 'Sanity Media' },
                        { value: 'url', title: 'External Image URL' },
                      ],
                    },
                    initialValue: 'class',
                  }),
                  defineField({
                    type: 'string',
                    name: 'iconClass',
                    title: 'Icon Class/Name',
                    description: 'Icon name or class (e.g., arrow-right, external-link)',
                    hidden: ({ parent }) => parent?.iconType !== 'class',
                  }),
                  defineField({
                    type: 'string',
                    name: 'iconFill',
                    title: 'Icon Fill Color',
                    description: 'Icon Color fil (e.g #000, #fff)',
                  }),
                  defineField({
                    type: 'string',
                    name: 'iconComponent',
                    title: 'Icon Component',
                    description: 'Icon component name (e.g., ArrowRight, ExternalLink)',
                    hidden: ({ parent }) => parent?.iconType !== 'component',
                  }),
                  defineField({
                    type: 'image',
                    name: 'iconImage',
                    title: 'Icon Image',
                    hidden: ({ parent }) => parent?.iconType !== 'sanity',
                  }),
                  defineField({
                    type: 'url',
                    name: 'iconUrl',
                    title: 'Icon Image URL',
                    hidden: ({ parent }) => parent?.iconType !== 'url',
                  }),
                  defineField({
                    type: 'string',
                    name: 'target',
                    title: 'Target',
                    options: {
                      list: [
                        { value: '_blank', title: 'Blank' },
                        { value: '_parent', title: 'Parent' },
                      ],
                    },
                  }),
                ],
              },
            ],
          },
        },
        { type: 'image' },
        { type: 'file' },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
})

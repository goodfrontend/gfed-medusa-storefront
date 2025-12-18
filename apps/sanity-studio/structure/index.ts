import { CogIcon } from '@sanity/icons'
import {StructureBuilder} from 'sanity/structure'

const structure = (S: StructureBuilder) =>
S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Navigation')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Navigation')
            .items([
              S.listItem()
                .title('Footer Content')
                .child(
                  S.document()
                    .schemaType('footer')
                    .documentId('footerId')
                    .title('Footer Content')
                )
            ])
        )
    ])

export default structure

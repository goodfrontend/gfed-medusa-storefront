import { config as loadEnv } from 'dotenv';

import type { CodegenConfig } from '@graphql-codegen/cli';

loadEnv();

const BFF_URL = process.env.BFF_URL;

if (!BFF_URL) {
  throw new Error(
    'BFF_URL environment variable is required. Please set it to your GraphQL API endpoint.'
  );
}

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [BFF_URL]: {},
    },
  ],
  documents: ['src/lib/gql/**/*.{ts,tsx}'],
  generates: {
    './src/types/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        useTypeImports: true,
        documentMode: 'documentNode',
        gqlImport: '@apollo/client#gql',
        dedupeFragments: true,
        inlineFragmentTypes: 'combine',
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        addUnderscoreToArgsType: true,
      },
    },
  },
  ignoreNoDocuments: false,
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;

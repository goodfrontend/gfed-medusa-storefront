import { nextJsConfig } from '@packages/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */
const config = [
  ...nextJsConfig,
  {
    ignores: ['./src/lib/gql/generated-types/graphql.ts'],
  },
];
export default config;

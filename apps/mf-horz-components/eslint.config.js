import { reactInternalConfig } from '@packages/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
const config = [
  ...reactInternalConfig,
  {
    ignores: ['**/dist/*', '**/build/*'],
  },
];
export default config;

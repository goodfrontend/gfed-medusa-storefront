// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { reactInternalConfig } from '@packages/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactInternalConfig,
  ...storybook.configs['flat/recommended'],
];

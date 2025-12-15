import type { Config } from 'jest';

import { reactJestConfig } from '@packages/jest-config/react';

const config: Config = {
  testPathIgnorePatterns: ['dist'],
  ...reactJestConfig,
};

export default config;

import type { Config } from 'jest';

import { reactJestConfig } from '@packages/jest-config/react';

const config: Config = {
  ...reactJestConfig,
};

export default config;

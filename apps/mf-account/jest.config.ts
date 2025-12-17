import type { Config } from 'jest';

import { reactJestConfig } from '@packages/jest-config/react';

const config: Config = {
  ...reactJestConfig,
  moduleNameMapper: {
    ...reactJestConfig.moduleNameMapper,
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

export default config;

import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/**/*.tsx',
    'src/**/*.ts',
    '!src/**/*.test.tsx',
    '!src/**/*.test.ts',
  ],
  dts: true,
  fixedExtension: false,
});

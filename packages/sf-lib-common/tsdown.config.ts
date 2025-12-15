import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/**/*.tsx',
    'src/**/*.ts',
    '!src/**/*.test.tsx',
    '!src/**/*.test.ts',
  ],
  dts: true,
  unbundle: true, // the consumer should do the bundling (e.g. next.js should handle this)
  external: ['react', 'react-dom', 'next'],
  fixedExtension: false,
  platform: 'browser',
});

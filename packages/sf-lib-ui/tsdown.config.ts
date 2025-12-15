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
  unbundle: true, // the consumer should do the bundling (e.g. next.js should handle this)
  platform: 'browser',
  external: ['react', 'react-dom', 'next'],
  copy: {
    from: './src/styles',
  },
});

import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/server/index.tsx',
  format: 'esm',
  target: 'node20',
  platform: 'node',
  outDir: 'dist',
  clean: true,
  minify: true,
  fixedExtension: false,
  treeshake: true,
  noExternal: [/^@medusajs\//, /^@gfed-medusa\//],
});

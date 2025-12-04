import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'lib/index': 'src/index.ts',
  },
  format: ['esm', 'cjs'], // Generate both ESM and CommonJS formats
  dts: true, // Generate TypeScript declaration files (.d.ts) for each entry
  splitting: true, // Enable code splitting (for ESM output)
  sourcemap: true,
  clean: true, // Clean the dist folder before each build
  outDir: 'dist', // Ensure output goes to the 'dist' folder
});

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { server: 'src/server-render.tsx' },
  format: ['esm'],
  outDir: 'dist',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  external: ['react', 'react-dom', 'next'],
  esbuildOptions(options) {
    // For edge compatibility avoid node platform specific features
    options.platform = 'neutral';
    // Emit .mjs files for ESM bundles so the CDN/edge can import them as modules
    // use esbuild outExtension to map .js -> .mjs
    // @ts-ignore - tsup/esbuild types
    options.outExtension = { '.js': '.mjs' };
  },
});

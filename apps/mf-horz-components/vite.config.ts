import path from 'path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  const bundleName = 'horizontal-components';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      ...(isBuild
        ? { 'process.env.NODE_ENV': JSON.stringify('production') }
        : {}),
    },
    resolve: {
      alias: {
        'next/navigation': path.resolve(
          __dirname,
          'src/stubs/next-navigation.ts'
        ),
        'next/dist/compiled/@opentelemetry/api': path.resolve(
          __dirname,
          'src/stubs/otel-stub.ts'
        ),
      },
    },
    build: {
      emptyOutDir: true,
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      rollupOptions: {
        input: path.resolve(__dirname, 'src/client/index.tsx'),
        output: {
          entryFileNames: `${bundleName}-bundle.js`,
          format: 'iife',
          name: 'HorizontalComponentsBundle',
          assetFileNames: (assetInfo) => {
            return assetInfo.name?.endsWith('.css')
              ? `${bundleName}-styles.css`
              : `${bundleName}-styles.css`;
          },
        },
      },
    },
  };
});

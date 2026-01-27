import path from 'path';
import { defineConfig, loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const bundleName = 'horizontal-components';
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL': JSON.stringify(
        env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ''
      ),
      'process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY': JSON.stringify(
        env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ''
      ),
      'process.env.NEXT_PUBLIC_BFF_URL': JSON.stringify(
        env.NEXT_PUBLIC_BFF_URL || process.env.NEXT_PUBLIC_BFF_URL || ''
      ),
      'process.env.NEXT_PUBLIC_BASE_URL': JSON.stringify(
        env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || ''
      ),
    },
    build: {
      outDir: 'build',
      emptyOutDir: true,
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react-dom/client',
          'swr',
          /^next\//,

          /^@apollo\/client/,
          /^@medusajs\/js-sdk/,
        ],
        input: path.resolve(__dirname, 'src/client/index.tsx'),
        output: {
          entryFileNames: `${bundleName}-bundle.js`,
          format: 'iife',
          name: 'HorizontalComponentsBundle',
          assetFileNames: `${bundleName}-styles.css`,
          globals: (id) => {
            const prefix = '__GFED_GLOBALS__';
            if (id === 'react') return `${prefix}.React`;
            if (id === 'react-dom') return `${prefix}.ReactDOM`;
            if (id === 'react-dom/client') return `${prefix}.ReactDOMClient`;
            if (id === 'swr') return `${prefix}.SWR`;
            if (id.startsWith('@apollo/client')) return `${prefix}.Apollo`;
            if (id.startsWith('@medusajs/js-sdk')) return `${prefix}.Medusa`;
            if (id.startsWith('next/')) return 'undefined';
            return id;
          },
        },
      },
    },
  };
});

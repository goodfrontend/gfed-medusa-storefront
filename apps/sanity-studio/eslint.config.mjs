import { reactInternalConfig } from '@packages/eslint-config/react-internal';

export default [
  ...reactInternalConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
      'prefer-arrow-callback': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-types': 'off',
      'react/prop-types': 'off', 
      'react/display-name': 'warn',
    },
  },
  {
    files: ['**/*.config.{js,ts,mjs}'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['schemas/**/*.{js,ts}'],
    rules: {
      'max-lines': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: [
      'dist/**',
      '.sanity/**',
      'node_modules/**',
      '*.min.js',
    ],
  },
];

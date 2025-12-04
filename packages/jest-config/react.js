const reactJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.ts'],
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Map @/ to src/
    '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js', // Mock static file imports
  },

  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage', '/dist'],
};

module.exports = { reactJestConfig };

/** @type {import('jest').Config} */
const config = {
  globalSetup: './src/tests/scripts/globalSetup.js',
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
};

// eslint-disable-next-line
module.exports = config;

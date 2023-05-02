/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:i18n-json/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'i18n-json/identical-keys': [
      2,
      {
        filePath: (function getFilePath() {
          const pathToLocales = './public/locales/en';
          const filesArray = fs.readdirSync(pathToLocales);
          return filesArray.reduce((acc, file) => {
            acc[file] = path.resolve(`${pathToLocales}/${file}`);
            return acc;
          }, {});
        })(),
      },
    ],
    'i18n-json/valid-message-syntax': 0,
  },
};

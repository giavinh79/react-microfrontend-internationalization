import '../../public/locales/i18n'; // import in regular types

// name must be i18next.d.ts - https://github.com/i18next/react-i18next/tree/master/example/react-typescript/simple-multi-namespaces
// documentation suggesting using react-i18next.d.ts does not work

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'mfe';
    resources: {
      mfe: typeof import('../../public/locales/en/mfe.json');
      error: typeof import('../../public/locales/en/error.json');
    };
  }
}

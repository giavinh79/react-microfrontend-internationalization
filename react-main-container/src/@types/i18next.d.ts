import '../../public/locales/i18n'; // import in regular types

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'app';
    resources: {
      app: typeof import('../../public/locales/en/app.json');
      common: typeof import('../../public/locales/en/common.json');
    };
  }
}

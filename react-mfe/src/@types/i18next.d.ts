import '../../public/locales/i18n'; // import in regular types

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'mfe';
    resources: {
      mfe: typeof import('../../public/locales/en/mfe.json');
      error: typeof import('../../public/locales/en/error.json');
      'host-common': {
        [key: string]: string;
      };
    };
  }
}

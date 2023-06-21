import mfe from '../../public/locales/en/mfe.json';
import error from '../../public/locales/en/error.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'mfe';
    resources: {
      mfe: typeof mfe;
      error: typeof error;
      'host-common': {
        [key: string]: string;
      };
    };
  }
}

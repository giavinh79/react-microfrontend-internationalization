import { InitOptions, createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const mfeInstance = createInstance();

export const DEFAULT_I18N_CONFIG: InitOptions = {
  debug: false,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  returnNull: false,
  ns: ['mfe'],
  defaultNS: 'mfe',
  react: {
    transSupportBasicHtmlNodes: true,
  },
};

// config and initialization
mfeInstance
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    ...DEFAULT_I18N_CONFIG,
    backend: {
      loadPath: () => `${process.env.BASE_URL}/locales/{{lng}}/{{ns}}.json`,
    },
  });

export default mfeInstance;

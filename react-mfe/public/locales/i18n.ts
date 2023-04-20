import { createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const mfeInstance = createInstance();

// config and initialization
mfeInstance
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: window.location.hostname === 'localhost',
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    returnNull: false,
    ns: ['mfe'],
    defaultNS: 'mfe',
    backend: {
      loadPath: () => `${process.env.BASE_URL}/locales/{{lng}}/{{ns}}.json`,
    },
    react: {
      transSupportBasicHtmlNodes: true,
      // transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
  });

export default mfeInstance;

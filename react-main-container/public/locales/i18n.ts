// import { initReactI18next } from 'react-i18next';
import i18n, { createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const appI18n = createInstance();

// config and initialization
appI18n
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // // pass the i18n instance to react-i18next.
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
    ns: ['app', 'common'],
    defaultNS: 'app',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      transSupportBasicHtmlNodes: true,
      // transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
  });

export default appI18n;

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import appTranslationsEN from './en/app.json';
import commonTranslationsEN from './en/common.json';
import appTranslationsFR from './fr/app.json';
import commonTranslationsFR from './fr/common.json';

export enum Translations {
  EN = 'en',
  FR = 'fr',
}

// translation files
const resources = {
  [Translations.EN]: {
    app: appTranslationsEN,
    common: commonTranslationsEN,
  },
  [Translations.FR]: {
    app: appTranslationsFR,
    common: commonTranslationsFR,
  },
};

// config and initialization
i18n
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
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
    }
  });

export default i18n;

import React, { Suspense, useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import i18n from '../public/locales/i18n';
import { Information } from './components/Information';
import { useTranslationSync } from './hooks/useTranslationSync';

export const Microfrontend = () => {
  const { i18n: mainAppI18n } = useTranslation();
  useTranslationSync({
    mainAppI18n,
    i18n,
    hostNamespacesToLoadMap: {
      common: 'host-common',
    },
  });

  // useEffect(() => {
  //   const languageChangedEventHandler = (language: string) => {
  //     i18n.changeLanguage(language); // updating MFE language
  //   };

  //   mainAppI18n.on('languageChanged', languageChangedEventHandler);

  //   return () => mainAppI18n.off('languageChanged', languageChangedEventHandler);
  // }, [mainAppI18n]);
  // the logic above is if we don't want/need to dynamically load translations from host into MFE

  // useEffect(() => {
  //   if (cache.size === 0) {
  //     // initial load - grab desired namespaces from mainApp i18n on initial load
  //     const commonResourceBundle = mainAppI18n.getResourceBundle(mainAppI18n.language, 'common');
  //     i18n.addResourceBundle(mainAppI18n.language, 'host-common', commonResourceBundle, true, false);
  //     cache.add(mainAppI18n.language);

  //     // sync languages between MFE and host
  //     i18n.changeLanguage(mainAppI18n.language);
  //   }

  //   const languageChangedEventHandler = (language: string) => {
  //     if (!cache.has(language)) {
  //       const commonResourceBundle = mainAppI18n.getResourceBundle(mainAppI18n.language, 'common');
  //       i18n.addResourceBundle(mainAppI18n.language, 'host-common', commonResourceBundle, true, false);
  //       cache.add(language);
  //     }
  //     i18n.changeLanguage(language);
  //   };

  //   mainAppI18n.on('languageChanged', languageChangedEventHandler);

  //   return () => mainAppI18n.off('languageChanged', languageChangedEventHandler);
  // }, [mainAppI18n]);

  return (
    <Suspense fallback={<>Loading MFE...</>}>
      <I18nextProvider i18n={i18n}>
        <Information />
      </I18nextProvider>
    </Suspense>
  );
};

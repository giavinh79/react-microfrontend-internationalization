import React, { Suspense, useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import i18n from '../public/locales/i18n';

const Information = () => {
  const { t } = useTranslation(['mfe']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>{t('mfe:GREETING')}</p>
      The MFE is able to use translations from the host such as: {t('common:NAME')}
    </div>
  );
};

const cache = new Set();

export const Microfrontend = () => {
  const { i18n: mainAppI18n } = useTranslation();

  useEffect(() => {
    if (cache.size === 0) {
      // initial load
      // grab desired namespaces from mainApp i18n on initial load
      const commonResourceBundle = mainAppI18n.getResourceBundle(mainAppI18n.language, 'common');
      i18n.addResourceBundle(mainAppI18n.language, 'common', commonResourceBundle, true, false);
      cache.add(mainAppI18n.language);

      // sync languages
      i18n.changeLanguage(mainAppI18n.language);
    }

    const languageChangedEventHandler = (language: string) => {
      if (!cache.has(language)) {
        const commonResourceBundle = mainAppI18n.getResourceBundle(mainAppI18n.language, 'common');
        i18n.addResourceBundle(mainAppI18n.language, 'common', commonResourceBundle, true, false);
        cache.add(language);
      }
      i18n.changeLanguage(language);
    };

    mainAppI18n.on('languageChanged', languageChangedEventHandler);

    return () => mainAppI18n.off('languageChanged', languageChangedEventHandler);
  }, [mainAppI18n]);

  return (
    <Suspense fallback={<>Loading MFE...</>}>
      <I18nextProvider i18n={i18n}>
        <Information />
      </I18nextProvider>
    </Suspense>
  );
};

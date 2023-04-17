import React, { Suspense, useContext, useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { mainAppI18nContext, MainAppI18nProvider } from './contexts/MainI18nContext';

import i18n from '../public/locales/i18n';

const Information = () => {
  const { t } = useTranslation(['mfe']);
  const mainAppI18n = useContext(mainAppI18nContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>{t('mfe:GREETING')}</p>
      The MFE is able to use translations from the host such as: {mainAppI18n.t('common:NAME')}
    </div>
  );
};

export const Microfrontend = () => {
  const { i18n: mainAppI18n } = useTranslation();

  useEffect(() => {
    const languageChangedEventHandler = (language: string) => {
      i18n.changeLanguage(language);
    };

    mainAppI18n.on('languageChanged', languageChangedEventHandler);

    return () => mainAppI18n.off('languageChanged', languageChangedEventHandler);
  }, [mainAppI18n]);

  return (
    <MainAppI18nProvider>
      <Suspense fallback={<>Loading MFE...</>}>
        <I18nextProvider i18n={i18n}>
          <Information />
        </I18nextProvider>
      </Suspense>
    </MainAppI18nProvider>
  );
};

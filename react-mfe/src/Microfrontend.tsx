import React, { Suspense, useContext, useEffect } from 'react';
import { I18nextProvider, Trans, useTranslation } from 'react-i18next';

import { mainAppI18nContext, MainAppI18nProvider } from './contexts/MainI18nContext';

import i18n from '../public/locales/i18n';

const TestComponentForInterpolation = () => {
  return <>{':)'}</>;
};

export const Information = () => {
  const { t } = useTranslation(['mfe', 'error', 'host-common']);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #e8e8e8',
        padding: '1rem',
      }}
    >
      <p>{t('GREETING', { ns: 'mfe' })}</p>
      <p>The MFE is able to use translations from the host such as: {t('host-common:NAME')}</p>

      <p>
        {
          "What about interpolation? If it's simple enough you can directly use the `t` function and pass in variables. If you need to embed HTML, then you will need to use the `Trans` component. Using `transSupportBasicHtmlNodes` we can simplify some boilerplate around HTML tags typically used to style a subset of the text like bold and italics. For more complicated elements, we need to pass in a `components` prop. See following examples:"
        }
      </p>

      <p data-testid='interpolation-example'>
        <Trans t={t} i18nKey='error:GENERIC_ERROR' components={{ smiley: <TestComponentForInterpolation /> }} />
      </p>

      {t('error:ERROR_HELP', {
        contact: 'fakeemail@fakeemail.com',
      })}
    </div>
  );
};

const cache = new Set();

export const Microfrontend = () => {
  const { i18n: mainAppI18n } = useTranslation();

  // useEffect(() => {
  //   const languageChangedEventHandler = (language: string) => {
  //     i18n.changeLanguage(language); // updating MFE language
  //   };

  //   mainAppI18n.on('languageChanged', languageChangedEventHandler);

  //   return () => mainAppI18n.off('languageChanged', languageChangedEventHandler);
  // }, [mainAppI18n]);
  // the logic above is fine if we don't dynamically load translations from host into MFE

  useEffect(() => {
    if (cache.size === 0) {
      // initial load - grab desired namespaces from mainApp i18n on initial load
      const commonResourceBundle = mainAppI18n.getResourceBundle(mainAppI18n.language, 'common');
      i18n.addResourceBundle(mainAppI18n.language, 'host-common', commonResourceBundle, true, false);
      cache.add(mainAppI18n.language);

      // sync languages between MFE and host
      i18n.changeLanguage(mainAppI18n.language);
    }

    const languageChangedEventHandler = (language: string) => {
      if (!cache.has(language)) {
        const commonResourceBundle = mainAppI18n.getResourceBundle(mainAppI18n.language, 'common');
        i18n.addResourceBundle(mainAppI18n.language, 'host-common', commonResourceBundle, true, false);
        cache.add(language);
      }
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

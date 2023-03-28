import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import mfeAppTranslationsEN from '../public/locales/en/mfe.json';
import mfeAppTranslationsFR from '../public/locales/fr/mfe.json';

const Information = () => {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <b>{t('common:NAME')}</b>: {t('mfe:NAME')}
      </div>
      <div>
        <b>{t('common:FRAMEWORK')}</b>: React.js
      </div>
      <div>
        <b>{t('common:LANGUAGE')}</b>: TypeScript
      </div>
    </div>
  );
};

export const Microfrontend = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    i18n.addResourceBundle('en', 'mfe', mfeAppTranslationsEN, true, false);
    i18n.addResourceBundle('fr', 'mfe', mfeAppTranslationsFR, true, false);
    setIsLoaded(true);
  }, []);

  return <div className='container'>{isLoaded && <Information />}</div>;
};

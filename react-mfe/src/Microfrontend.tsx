import React from 'react';
import { useTranslation } from 'react-i18next';

import { useLoadTranslation } from './useLoadTranslation';

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
  const { isLoaded } = useLoadTranslation();

  return <div className='container'>{isLoaded && <Information />}</div>;
};

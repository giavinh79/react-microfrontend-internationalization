import React from 'react';
import { useTranslation } from 'react-i18next';

export const MainPanel = () => {
  const { t, i18n } = useTranslation(['app', 'common']);
  const [isEnglish, setIsEnglish] = React.useState(i18n.language === 'en');

  const handleLocaleChange = () => {
    if (isEnglish) {
      i18n.changeLanguage('fr');
    } else {
      i18n.changeLanguage('en');
    }

    setIsEnglish((isEnglish) => !isEnglish);
  };

  return (
    <div className='main-container'>
      <h1 style={{ marginBottom: '1rem' }}>{t('app:TITLE')}</h1>
      <button type='button' onClick={handleLocaleChange}>
        {isEnglish ? 'I want French!' : 'I want English!'}
      </button>
    </div>
  );
};

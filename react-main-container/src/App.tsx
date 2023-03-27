import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Microfrontend } from 'reactMfe/microfrontend';

import i18n from './locales/i18n';
import './index.css';

const MainPanel = () => {
  const { t, i18n } = useTranslation();
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

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <MainPanel />
      <Microfrontend />
    </I18nextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

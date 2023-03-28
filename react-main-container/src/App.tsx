import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Microfrontend } from 'reactMfe/microfrontend';

import { MainPanel } from './MainPanel';
import './index.css';

import i18n from '../public/locales/i18n';

const App = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <I18nextProvider i18n={i18n}>
        <MainPanel />
        <Microfrontend />
      </I18nextProvider>
    </Suspense>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

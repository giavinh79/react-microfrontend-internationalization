import React, { ReactElement, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { RenderOptions, render } from '@testing-library/react';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n, { DEFAULT_I18N_CONFIG } from '../../public/locales/i18n';

import error from '../../public/locales/en/error.json';
import mfe from '../../public/locales/en/mfe.json';

// Test instance that just uses resources so there's no loading states
const testI18nInstance = createInstance();
testI18nInstance.use(LanguageDetector).init({
  ...DEFAULT_I18N_CONFIG,
  debug: false,
  resources: {
    en: {
      error,
      mfe,
    },
  },
});

const AppProvidersTestI18n = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback='Loading..'>
      <I18nextProvider i18n={testI18nInstance}>{children}</I18nextProvider>
    </Suspense>
  );
};

export const renderWithTestI18n = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AppProvidersTestI18n, ...options });

// Using identical i18n instance
const AppProvidersI18n = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback='Loading...'>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Suspense>
  );
};

export const renderWithI18n = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AppProvidersI18n, ...options });

export * from '@testing-library/react';

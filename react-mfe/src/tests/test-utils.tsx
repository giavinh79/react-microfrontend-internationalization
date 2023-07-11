import React, { ReactElement, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance, i18n } from 'i18next';
import { RenderOptions, render } from '@testing-library/react';
import LanguageDetector from 'i18next-browser-languagedetector';
// import fs from 'fs';
// import path from 'path';

import { DEFAULT_I18N_CONFIG } from '../../public/locales/i18n';

/**
 * Test i18n instance that loads resources so there's no loading states
 */
export const testI18nInstance = createInstance();
testI18nInstance.use(LanguageDetector).init({
  ...DEFAULT_I18N_CONFIG,
  debug: false,
  resources: {},
});

console.log('wat');
console.log(testI18nInstance.getResourceBundle('en', 'host-common'));

// /**
//  * Given a path to translation namespaces and an i18n instance, this function asynchronously adds those translations to the i18n instance
//  */
// const setupTranslations = (() => {
//   let ranTranslationSetup = false;

//   return async (pathToTranslationFiles: string, i18nInstance: i18n) => {
//     if (ranTranslationSetup) return;
//     const translationFiles = fs.readdirSync(pathToTranslationFiles);

//     await Promise.all(
//       translationFiles.map(async (file) => {
//         const namespaceName = file.split('.')[0]; // example value of `file`: 'mfe.json'
//         const namespaceResource = await import(pathToTranslationFiles + file);
//         i18nInstance.addResourceBundle('en', namespaceName, namespaceResource);
//       })
//     );
//     ranTranslationSetup = true;
//   };
// })();

// beforeAll(async () => {
//   // any test that imports this file will always run this `beforeAll` logic
//   // since we only want to set up translations once (for all tests), we want to ensure that the below function only does set up one time
//   // test if global set up works with this
//   await setupTranslations(path.resolve() + '\\public\\locales\\en\\', testI18nInstance);
// });

const AppProvidersTestI18n = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback='Loading..'>
      <I18nextProvider i18n={testI18nInstance}>{children}</I18nextProvider>
    </Suspense>
  );
};

export const renderWithTestI18n = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AppProvidersTestI18n, ...options });

export * from '@testing-library/react';

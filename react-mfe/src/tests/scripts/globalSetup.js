import fs from 'fs';
import path from 'path';

import { testI18nInstance } from '../test-utils.tsx';

const setupTranslations = async () => {
  const pathToTranslationFiles = `${path.resolve()}\\public\\locales\\en\\`;
  const translationFiles = fs.readdirSync(pathToTranslationFiles);

  console.log('wtf');
  await Promise.all(
    translationFiles.map(async (file) => {
      const namespaceName = file.split('.')[0]; // example value of `file`: 'mfe.json'
      const namespaceResource = await import(pathToTranslationFiles + file);
      // console.log(namespaceResource);
      testI18nInstance.addResourceBundle('en', namespaceName, namespaceResource);
    })
  );
  // console.log(testI18nInstance.getResourceBundle('en', 'mfe'));
  console.log(testI18nInstance.getResourceBundle('en', 'error'));
  console.log('wtf2');
};

module.exports = setupTranslations;

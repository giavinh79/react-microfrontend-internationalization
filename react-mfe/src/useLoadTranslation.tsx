import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const cache = new Set();
const NAMESPACES = ['mfe'];

interface UseLoadTranslationApi {
  isLoaded: boolean;
}

export const useLoadTranslation = (): UseLoadTranslationApi => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { i18n } = useTranslation();

  const lazyLoadTranslations = async (language: string) => {
    for (const namespace of NAMESPACES) {
      await import('../public/locales/' + language + `/${namespace}.json`)
        .catch((error) => {
          console.warn(error);
        })
        .then((translation) => {
          return i18n.addResourceBundle(language, namespace, translation, true, false);
        });
    }
  };

  useEffect(() => {
    (async () => {
      if (cache.size === 0) {
        // initial load
        await lazyLoadTranslations(i18n.language);
        setIsLoaded(true);
      }

      i18n.on('languageChanged', async (language) => {
        if (cache.has(language)) {
          return;
        }

        setIsLoaded(false);
        cache.add(language);
        await lazyLoadTranslations(language);
        setIsLoaded(true);
      });
    })();
  }, []);

  return {
    isLoaded,
  };
};

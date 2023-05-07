import { i18n } from 'i18next';
import React, { useEffect } from 'react';

interface UseTranslationSyncProps {
  /**
   * Host app i18n instance
   */
  mainAppI18n: i18n;
  /**
   * MFE i18n instance
   */
  i18n: i18n;
  /**
   * Namespaces to dynamically load into MFE app from host where map key is the host namespace and the key value is the new namespace name for MFE i18n instance.
   * Ensure that the new MFE namespace is added to the type definition (`i18next.d.ts`) & an empty placeholder for the namespace is added to locales to avoid console error.
   */
  hostNamespacesToLoadMap?: Record<string, string>;
}

const cache = new Set();

/**
 * Custom hook for syncing host app i18n with MFE app i18n
 */
export const useTranslationSync = ({ mainAppI18n, i18n, hostNamespacesToLoadMap = {} }: UseTranslationSyncProps) => {
  useEffect(() => {
    const syncInstances = (language: string) => {
      try {
        Object.entries(hostNamespacesToLoadMap).map(([hostNamespace, mfeNamespace]) => {
          const hostResourceBundle = mainAppI18n.getResourceBundle(language, hostNamespace);
          i18n.addResourceBundle(language, mfeNamespace, hostResourceBundle, true, false);
        });
        cache.add(language);
      } catch (err) {
        // handle error here
        // likely some namespace could not be loaded from the host, but we don't want to break the MFE i18n integration
      }
      // initial load - grab desired namespaces from mainApp i18n on initial load
      const commonResourceBundle = mainAppI18n.getResourceBundle(language, 'common');
      i18n.addResourceBundle(language, 'host-common', commonResourceBundle, true, false);
      cache.add(language);

      // sync languages between MFE and host
      i18n.changeLanguage(mainAppI18n.language);
    };

    if (cache.size === 0) {
      // initial load - grab desired namespaces from mainApp i18n on initial load
      syncInstances(mainAppI18n.language);
    }

    mainAppI18n.on('languageChanged', syncInstances);

    return () => mainAppI18n.off('languageChanged', syncInstances);
  }, [mainAppI18n]);
};

import React, { createContext, ReactNode } from 'react';
import { i18n } from 'i18next';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// it can never actually be null within our MFE when consumed with createContext
export const mainAppI18nContext = createContext<i18n>(null);

export const MainAppI18nProvider = ({ children }: { children: ReactNode }) => {
  const { i18n: mainAppI18n } = useTranslation();

  return <mainAppI18nContext.Provider value={mainAppI18n}>{children}</mainAppI18nContext.Provider>;
};

import React, { createContext, ReactNode } from 'react';
import type { i18n } from 'i18next';
import { useTranslation } from 'react-i18next';

interface MainAppI18n extends Omit<i18n, 't'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  // t: (key: string, options?: TOptionsBase) => string; // might need to do t: any instead because this t function may not be passable to other i18n functions/components
}

export const mainAppI18nContext = createContext<MainAppI18n>({} as i18n);

export const MainAppI18nProvider = ({ children }: { children: ReactNode }) => {
  const { i18n: mainAppI18n } = useTranslation();

  return <mainAppI18nContext.Provider value={mainAppI18n}>{children}</mainAppI18nContext.Provider>;
};

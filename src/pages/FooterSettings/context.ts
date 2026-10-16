import { createContext } from 'react';

interface FooterSettingsType {
  lang: 'fr' | 'en';
  tabTitle?: string;
  toggleLoading: () => void;
}

export const FooterSettingsContext = createContext<FooterSettingsType | undefined>(undefined);

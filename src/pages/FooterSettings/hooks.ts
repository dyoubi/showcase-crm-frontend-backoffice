import { useContext } from 'react';
import { FooterSettingsContext } from './context';

export const useFooterSettingsContext = () => {
  const context = useContext(FooterSettingsContext);
  if (!context) {
    throw new Error('useMediaContext must be within UserMediaContext.Provider');
  }

  return context;
};

import { useCallback, useContext } from 'react';

import { AppThemeContext } from '@/components/AppThemeProvider/context';

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be within AppThemeContext.Provider');
  }

  const { setTheme, theme } = context;

  const toggle = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggle,
  };
};

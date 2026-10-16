import { ReactNode, useState, memo, useMemo, useCallback } from 'react';
import { ThemeProvider } from '@emotion/react';

import { getDefaultThemeMode, saveThemeMode } from './logic.helper';
import { AppThemeContext } from './context';
import * as c from './constants';
import * as t from './types';

interface AppThemeProvider {
  children?: ReactNode;
}

export const AppThemeProvider = memo(({ children }: AppThemeProvider) => {
  const [theme, setState] = useState<t.Mode>(getDefaultThemeMode());

  const setTheme = useCallback(
    (mode: t.Mode) => {
      setState(mode);
      saveThemeMode(mode);
    },
    [setState],
  );

  const value = useMemo(() => ({ setTheme, theme }), [setTheme, theme]);

  return (
    <AppThemeContext.Provider value={value}>
      <ThemeProvider theme={c.themes[theme]}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
});

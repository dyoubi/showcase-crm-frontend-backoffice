import React from 'react';

import * as t from './types';

interface AppThemeContextType {
  theme: t.Mode;
  setTheme: (a: t.Mode) => void;
}

export const AppThemeContext = React.createContext<AppThemeContextType | undefined>(undefined);

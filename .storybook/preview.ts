import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

import { AppThemeProvider } from '../src/components/AppThemeProvider';

import { light as lightTheme, dark as darkTheme } from '../src/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeFromJSXProvider({
        themes: {
          light: lightTheme,
          dark: darkTheme,
      },
      defaultTheme: 'light',
      Provider: AppThemeProvider,
    }),
  ],
};

export default preview;

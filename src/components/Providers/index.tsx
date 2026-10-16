import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { store } from '@/libs/store';
import { queryClient } from '@/libs/react-query';

import { ToastContainer } from '../ToastContainer';
import { AppThemeProvider } from '../AppThemeProvider';
import { OidcAuthProvider } from '../AuthProvider';
import { GlobalStyles } from '../GlobalStyles';
import { ConfirmationModalProvider } from '../ConfirmationModalProvider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <AppThemeProvider>
    <ConfirmationModalProvider>
      <Provider store={store}>
        <ToastContainer />
        <GlobalStyles />
        <OidcAuthProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </OidcAuthProvider>
      </Provider>
    </ConfirmationModalProvider>
  </AppThemeProvider>
);

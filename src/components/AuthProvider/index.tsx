import { ReactNode } from 'react';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';

import { AuthHandler } from './AuthHandler';
import { configuration } from '../../configuration';

interface AuthOidcProviderProps {
  children?: ReactNode;
}

const oidcConfig: AuthProviderProps = {
  authority: configuration.AUTH_API_URL,
  client_id: 'egcringoffice',
  redirect_uri: window.location.origin,
  automaticSilentRenew: true,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
} as const;

export const OidcAuthProvider = ({ children }: AuthOidcProviderProps) => (
  <AuthProvider {...oidcConfig}>
    <AuthHandler>{children}</AuthHandler>
  </AuthProvider>
);

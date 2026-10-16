import { useEffect } from 'react';
import { hasAuthParams, useAuth } from 'react-oidc-context';

import { setAuthApiTokenHeader } from '@/domains/api';
import { useHandleError, useToaster } from '../../../hooks';

// This hook is used for redirect the user to login page automatically
export const useAutoSignIn = () => {
  const auth = useAuth();
  const toaster = useToaster();

  // automatically sign-in
  useEffect(() => {
    if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading) {
      auth.signinRedirect().catch((e) =>
        toaster({
          color: 'danger',
          content: `An error occurred : ${e}`,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// This hook is used for redirect the user
// to login page when the oidc token is expired
export const useHandleExpiringToken = () => {
  const { events, signinSilent } = useAuth();
  const toaster = useToaster();
  const errorHandler = useHandleError();

  useEffect(() => {
    // the `return` is important - addAccessTokenExpiring() returns a cleanup function
    return events.addAccessTokenExpiring(() => {
      toaster({
        color: 'warning',
        content: "Your login session is expired, you're about to be redirected",
      });

      setTimeout(() => signinSilent().catch(errorHandler), 3000);
    });
  }, [events, signinSilent, toaster, errorHandler]);
};

// This hook is used set api token in requests headers
export const useSyncAccessToken = () => {
  const { user } = useAuth();

  useEffect(() => {
    setAuthApiTokenHeader(user?.access_token);
  }, [user?.access_token]);
};

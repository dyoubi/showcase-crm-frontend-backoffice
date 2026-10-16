import { useCallback } from 'react';
import { useAuth } from 'react-oidc-context';

export const useLogout = () => {
  const auth = useAuth();

  return useCallback(async () => {
    try {
      await auth.removeUser();

      await auth.signoutRedirect();
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }, [auth]);
};
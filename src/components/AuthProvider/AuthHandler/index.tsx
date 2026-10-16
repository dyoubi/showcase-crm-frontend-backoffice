import { ReactNode } from 'react';
import { useAuth } from 'react-oidc-context';

import { Button } from '@/shared/Button';

import { DATA_TEST_IDS } from '@/constants';

import { AppLoading } from '@/components/AppLoading';

import { useAutoSignIn, useHandleExpiringToken } from './hooks';
import { Container } from './styles';

interface AuthHandlerProps {
  children: ReactNode;
}

export const AuthHandler = ({ children }: AuthHandlerProps) => {
  const auth = useAuth();
  useAutoSignIn();
  useHandleExpiringToken();

  if (auth.isLoading) {
    return <AppLoading />;
  }

  if (auth.activeNavigator || !auth.isAuthenticated) {
    return (
      <Container
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        data-testid={DATA_TEST_IDS.SIGN_IN_BUTTON}
      >
        <Button color="success" onClick={() => auth.signinRedirect()}>
          Sign in
        </Button>
      </Container>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

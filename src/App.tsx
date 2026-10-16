import { memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@/libs/yup';

import { useSyncAccessToken } from '@/components/AuthProvider/AuthHandler/hooks';
import { useGetCasinos } from '@/domains/casino/hooks';
import { setCasinoId } from '@/domains/casino/logic.helper';

import { AppLoading } from '@/components/AppLoading';
import { BuiltInCasinosSlugs } from '@/domains/casino/constants';
import { Menu } from '@/components/Menu';

import { setCurrentCasino, setCasinosList } from '@/domains/account/slice';
import { setAvailableCurrencies, useGetCryptoCurrencies } from '@/domains/currency';
import { useAppDispatch, useToaster } from './hooks';

import AppRoutes from './AppRoutes';

export const App = memo(() => {
  const dispatch = useAppDispatch();
  const toaster = useToaster();

  // Ensure access token is set before making API requests
  useSyncAccessToken();

  // Fetch coins and stored in global redux state
  useGetCryptoCurrencies({
    onSuccess: (res) => {
      if (!res) {
        toaster({
          color: 'warning',
          content: 'No coins available from ring-coins',
        });
        return;
      }

      dispatch(setAvailableCurrencies(res));
    },
  });

  const { isFetching } = useGetCasinos({
    onSuccess: (res) => {
      if (!res || !res?.length) {
        toaster({
          color: 'warning',
          content: 'There is no casino associated to you account',
        });
        return;
      }

      const selectedCasino = res.find((casino) => casino.key === BuiltInCasinosSlugs.EGC_BITPLAY) || res[0];

      dispatch(setCurrentCasino(selectedCasino));
      dispatch(setCasinosList(res));

      setCasinoId(selectedCasino.id);
    },
  });

  if (isFetching) {
    return <AppLoading />;
  }

  return (
    <BrowserRouter>
      <Menu>
        <AppRoutes />
      </Menu>
    </BrowserRouter>
  );
});

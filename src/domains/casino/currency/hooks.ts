import { useMutation, useQuery } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../hooks';

import { deleteCurrencyFromCasino, getCurrencyFromCasino, getCurrencyFromFinance, patchCurrencyDataFromCasino, postAddNewCurrency } from './api';
import * as t from './types';

export const useGetCurrencyFromFinance = () => {
  return useQuery<t.GetCurrencyFromFinanceResponse>([QUERY_KEYS.GET_CURRENCY], getCurrencyFromFinance);
};

export const useGetCurrencyFromCasino = () => {
  const { id: casinoId } = useCurrentCasino();
  return useQuery<t.GetCurrencyFromCasinoResponse>(
    [QUERY_KEYS.GET_CURRENCY_FROM_CASINO],
    () => getCurrencyFromCasino(casinoId));
};

export const usePostAddNewCurrency = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation((payload: t.PostAddNewCurrencyPayload) => postAddNewCurrency(casinoId, payload));
};

export const useDeleteCurrencyFromCasino = () => {
  const { id: casinoId } = useCurrentCasino();
  return useMutation((currencyId: string) => deleteCurrencyFromCasino(casinoId, currencyId));
};

export const usePatchCurrencyDataFromCasino = () => {
  const { id: casinoId } = useCurrentCasino();
  return useMutation((payload : t.CurrencyPayload) => patchCurrencyDataFromCasino(casinoId, payload));
};

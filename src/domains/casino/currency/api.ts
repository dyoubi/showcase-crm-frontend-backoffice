import { casinoApiRequest, financeApiRequest } from '../../api';
import * as t from './types';

export const getCurrencyFromFinance = async () => {
  const { data } = await financeApiRequest.get<t.GetCurrencyFromFinanceResponse>(`/coins`);
  return data;
};

export const getCurrencyFromCasino = async (casinoId: string) => {
  const queryObject = {
    providers: true
  };
  const queryUrl = `?query=${encodeURIComponent(JSON.stringify(queryObject))}`;
  const { data } = await casinoApiRequest.get<t.GetCurrencyFromCasinoResponse>(`/casinos/${casinoId}/currency-settings${queryUrl}`);

  return data;
};

export const postAddNewCurrency = async (casinoId: string, payload: t.PostAddNewCurrencyPayload) => {
  const { data } = await casinoApiRequest.post<t.PostAddNewCurrencyPayload>(
    `/casinos/${casinoId}/currency-settings`, payload);
  return data;
};

export const deleteCurrencyFromCasino = async (casinoId: string, currencyId: string) => {
  await casinoApiRequest.delete<void>(
    `/casinos/${casinoId}/currency-settings/${currencyId}`,
  );
};

export const patchCurrencyDataFromCasino = async (
  casinoId: string,
  payload: t.CurrencyPayload) => {
  await casinoApiRequest.patch<void>(
    `/casinos/${casinoId}/currency-settings/${payload.id}`, {
      "activate": !payload.activate
    }
  );
};

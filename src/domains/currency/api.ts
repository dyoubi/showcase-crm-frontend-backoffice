import axios from 'axios';

import { coinsApiRequest, operatorApiRequest } from '../api';

import * as t from './types';

// -----------------------------------------------
// GET
// -----------------------------------------------

export const getCoinsPriceFiat = async () => {
  const { data } = await axios.get<t.GetCoinPriceResponse>(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Ctron%2Cbitcoin&vs_currencies=usd,eur',
  );

  return {
    BTC: { USD: data?.bitcoin?.usd,  EUR: data?.bitcoin?.eur  },
    ETH: { USD: data?.ethereum?.usd, EUR: data?.ethereum?.eur },
    TRX: { USD: data?.tron?.usd,     EUR: data?.tron?.eur     },
  };
};

export const getCryptoCurrencies = async (): Promise<t.GetCoinsResponse> => {
  const { data } = await coinsApiRequest.get<t.GetCoinsResponse>('/coins.json');

  return data;
};

export const getCryptosFiatsRates = async (
  cryptoCode: t.CryptoCodes,
  fiatCode: t.FiatCodes,
) => {
  const { data } = await operatorApiRequest.get<t.GetCryptosFiatsRatesResponse>(
    `rates/${fiatCode}_${cryptoCode}`,
  );

  return data;
};

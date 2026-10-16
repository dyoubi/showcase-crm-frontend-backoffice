import { useCallback } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { QUERY_KEYS } from '@/libs/react-query';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { getDateFormatByCountry } from '../account/dateFormat';
import { selectCurrentDateFormat } from '../account/selectors';

import { getCoinsPriceFiat, getCryptoCurrencies, getCryptosFiatsRates } from './api';
import { selectAvailableCurrencies, selectFiatCurrencyCode } from './selectors';
import { setFiatCurrencyCode } from './slice';

import * as t from './types';

export const useGetCoinsPriceFiat = () => {
  return useQuery([QUERY_KEYS.GET_COINS_PRICES], getCoinsPriceFiat, {
    refetchInterval: 600000,
  });
};

export const useGetCryptoCurrencies = (options?: UseQueryOptions<t.GetCoinsResponse>) => {
  return useQuery<t.GetCoinsResponse>([QUERY_KEYS.GET_COINS], getCryptoCurrencies, options);
}

export const useGetCryptosFiatsRates = (
  cryptoCodes: t.CryptoCodes,
  fiatCodes: t.FiatCodes,
) => {
  return useQuery([QUERY_KEYS.GET_CRYPTO_FIATS_RATES, cryptoCodes, fiatCodes], () =>
    getCryptosFiatsRates(cryptoCodes, fiatCodes),
  );
};

export const useAppAvailableCurrencies = () => {
  const availableCurrencies = useAppSelector(selectAvailableCurrencies);

  const getCurrencyData = (currencyCode: t.CurrencyCodes | string) => availableCurrencies[currencyCode];

  return {
    availableCurrencies,
    getCurrencyData,
  }
};

export const useAppFiatCurrency = () => {
  const dispatch = useAppDispatch();
  const userFiatCurrency = useAppSelector(selectFiatCurrencyCode);
  const setUserFiatCurrency = useCallback(
    (currencyCode: t.FiatCodes) => dispatch(setFiatCurrencyCode(currencyCode)),
    [dispatch],
  );

  return {
    setUserFiatCurrency,
    userFiatCurrency,
  };
};

export const useConvertCurrencyInFiat = () => {
  const { userFiatCurrency } = useAppFiatCurrency();
  const { getCurrencyData } = useAppAvailableCurrencies();
  const formatPrice = useFormatPrice();
  const { data: coinsPriceFiat } = useGetCoinsPriceFiat();

  return useCallback((
    amount: string | number,
    currencyCode: t.CryptoCodes,
  ): { amount: string, amountInFiat: string } => {
    const currencyData = getCurrencyData(currencyCode);

    if (!coinsPriceFiat || !currencyData) {
      return {
        amount: `${amount}`,
        amountInFiat: 'Not available',
      };
    }

    const rate = coinsPriceFiat[currencyCode]?.[userFiatCurrency];

    if (rate === null || rate === undefined) {
      return {
        amount: `${amount}`,
        amountInFiat: 'Not available',
      };
    }

    const parsedAmount = Number(amount) / 10 ** currencyData.decimal_digits;

    return {
      amount: formatPrice({ amount: parsedAmount, currency: currencyCode, roundingPriority: 'morePrecision' }),
      amountInFiat: formatPrice({ amount: parsedAmount * rate, currency: userFiatCurrency }),
    };
  }, [
    coinsPriceFiat,
    formatPrice,
    getCurrencyData,
    userFiatCurrency,
  ]);
};

export const useFormatPrice = () => {
  const { country } = useAppSelector(selectCurrentDateFormat);

  return useCallback(({
    amount,
    currency,
    maximumFractionDigits = 2,
    roundingPriority = 'auto',
    withoutUnit = false,
  }: {
    amount: number | string,
    currency: t.CurrencyCodes,
    maximumFractionDigits?: number,
    roundingPriority?: 'auto' | 'morePrecision' | 'lessPrecision',
    withoutUnit?: boolean,
  }) => {
    const dateFormat = getDateFormatByCountry(country);
    const parsedAmount = Number(amount);
    const selectedLocale = dateFormat?.locale || 'fr-FR';

    if (withoutUnit) {
      return new Intl.NumberFormat(selectedLocale, {
        currency,
        maximumFractionDigits,
        // @TS-BLAME: This feature has been included in all major browsers since August 1st, 2023.
        // @ts-ignore
        roundingPriority,
      }).format(parsedAmount);
    }

    return new Intl.NumberFormat(selectedLocale, {
      currency,
      maximumFractionDigits,
      // @TS-BLAME: This feature has been included in all major browsers since August 1st, 2023.
      // @ts-ignore
      roundingPriority,
      style: 'currency',
    }).format(parsedAmount);
  }, [country]);
};

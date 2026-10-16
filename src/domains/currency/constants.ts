import * as t from './types';

export const FiatCurrenciesSelectOptions = Object.values(t.EFiatCodes).map((currencyCode) => ({
  label: currencyCode,
  value: currencyCode,
}));

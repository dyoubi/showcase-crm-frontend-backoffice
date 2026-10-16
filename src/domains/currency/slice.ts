import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as t from './types';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    availableCurrencies: {} as t.AvailableCurrency,
    fiatCurrencyCode: t.EFiatCodes.EUR as t.FiatCodes,
  },
  reducers: {
    setAvailableCurrencies: (draft, { payload }: PayloadAction<t.AvailableCurrency>) => {
      draft.availableCurrencies = payload;
    },
    setFiatCurrencyCode: (draft, { payload }: PayloadAction<t.FiatCodes>) => {
      draft.fiatCurrencyCode = payload;
    },
  },
});

export const {
  actions: {
    setAvailableCurrencies,
    setFiatCurrencyCode,
  },
} = currencySlice;

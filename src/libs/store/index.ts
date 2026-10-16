import { configureStore } from '@reduxjs/toolkit';

import { accountSlice } from '@/domains/account/slice';
import { currencySlice } from '@/domains/currency/slice';

const getStore = () =>
  configureStore({
    reducer: {
      account: accountSlice.reducer,
      currency: currencySlice.reducer,
    },
  });

export const store = getStore();

export type StoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

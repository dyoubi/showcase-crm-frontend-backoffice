import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getInitialDateFormat } from './dateFormat';
import { DateCountry } from './dateFormat/types';

import { Casino } from '../casino/types';

const casino: Casino = {
  id: '',
  key: '',
  name: '',
  fiat: 'EUR',
  cashierKey: null,
  cashierId:  null,
};
const casinosList: Array<Casino> = [];

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    casino,
    casinosList,
    countryDateFormat: getInitialDateFormat().country,
  },
  reducers: {
    setCurrentCasino: (draft, { payload }: PayloadAction<Casino>) => {
      draft.casino = payload || {};
    },
    setCasinosList: (draft, { payload }: PayloadAction<Array<Casino>>) => {
      draft.casinosList = payload;
    },
    setDateFormatCountry: (draft, { payload }: PayloadAction<DateCountry>) => {
      draft.countryDateFormat = payload;
    },
  },
});

export const {
  actions: { setCurrentCasino, setCasinosList, setDateFormatCountry },
} = accountSlice;

import { StoreState } from '@/libs/store';

import { DEFAULT_DATE_FORMAT, getDateFormatByCountry } from './dateFormat';

export const selectCurrentDateFormat = (app: StoreState) =>
  getDateFormatByCountry(app.account.countryDateFormat) || DEFAULT_DATE_FORMAT;

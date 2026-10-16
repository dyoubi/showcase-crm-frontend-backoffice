import { addDays } from 'date-fns';

import * as c from './constants';
import * as t from './types';

export const saveDateFormatCountry = (country: t.DateCountry) => {
  localStorage.setItem(c.DATE_FORMAT_LOCAL_STORAGE_KEY, country);
};

export const getDateFormatByCountry = (country?: string) =>
  c.DATE_FORMATS.find((dateFormat) => dateFormat.country === country);

export const getInitialDateFormat = () => {
  const localStorageCountry = localStorage.getItem(c.DATE_FORMAT_LOCAL_STORAGE_KEY) || undefined;
  return getDateFormatByCountry(localStorageCountry) || c.DEFAULT_DATE_FORMAT;
};

export const isValidCountry = (country: string): country is t.DateCountry =>
  !!getDateFormatByCountry(country);

export const getBeginAndEndDates = ({
  daysFromToday = 0,
  begin,
  end,
}: t.GetBeginAndEndDatesProps) => {
  const today = new Date();

  const selectedBegin = begin ? new Date(begin) : today;
  const selectedEnd = end ? new Date(end) : today;


  const calculatedBegin = addDays(
    new Date(Date.UTC(selectedBegin.getFullYear(), selectedBegin.getMonth(), selectedBegin.getDate(), 0, 0, 0, 0)),
    (daysFromToday < 0) ? daysFromToday : 0,
  );

  // Calculate always to EOD
  const calculatedEnd = addDays(
    new Date(Date.UTC(selectedEnd.getFullYear(), selectedEnd.getMonth(), selectedEnd.getDate(), 23, 59, 59, 999)),
    (daysFromToday > 0) ? daysFromToday : 0,
  );

  return {
    begin: calculatedBegin,
    end: calculatedEnd,
  };
};

import { useCallback } from 'react';
import format from 'date-fns/format';

import { selectCurrentDateFormat } from '@/domains/account/selectors';
import { setDateFormatCountry } from '@/domains/account/slice';
import { isValidCountry, saveDateFormatCountry } from '@/domains/account/dateFormat';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useToaster } from './useToaster';


interface Option {
  displayFullDate?: boolean;
}

export const useAppDateFormat = () => {
  const { dateFormat, country } = useAppSelector(selectCurrentDateFormat);
  const dispatch = useAppDispatch();
  const toaster = useToaster();

  const formatDate = useCallback(
    (date: string | number | Date, { displayFullDate }: Option = {}) => {
      try {
        return format(new Date(date), `${dateFormat} ${displayFullDate ? ' HH:mm' : ''}`);
      } catch (e) {
        console.error(e);
        return 'Invalid Date format';
      }
    },
    [dateFormat],
  );

  const setCountryDateFormat = useCallback(
    (newCountry?: string | null) => {
      if (!newCountry || !isValidCountry(newCountry)) {
        toaster({
          color: 'danger',
          content: 'Invalid country name dateFormat',
        });
        return;
      }

      dispatch(setDateFormatCountry(newCountry));
      saveDateFormatCountry(newCountry);
    },
    [dispatch, toaster],
  );

  return {
    dateFormat,
    country,
    setCountryDateFormat,
    formatDate,
  };
};

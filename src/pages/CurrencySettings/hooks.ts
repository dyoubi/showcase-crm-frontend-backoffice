import {
  useDeleteCurrencyFromCasino,
  usePatchCurrencyDataFromCasino,
  usePostAddNewCurrency,
} from '@/domains/casino/currency';

import { useHandleError, useToaster } from '../../hooks';
import * as t from './type';

export const useSaveCurrencySettings = <C>(reFetchCurrencySettingsFromCasino: () => Promise<C>) => {
  const { mutateAsync: postAddNewCurrency, isLoading: isLoadingPost } = usePostAddNewCurrency();
  const { mutateAsync: deleteCurrencyFromCasino } = useDeleteCurrencyFromCasino();
  const { mutateAsync: patchCurrencyDataFromCasino } = usePatchCurrencyDataFromCasino();

  const toaster = useToaster();
  const handleError = useHandleError();

  const addNewCurrency = async (values: t.AddNewCurrencyPayload) => {
    try {
      await postAddNewCurrency(values);
      await reFetchCurrencySettingsFromCasino();
      toaster({ content: 'Currency Added' });
      
    } catch (e) {
      handleError(e);
    }
  };

  const deleteCurrency = async (currencyId: string) => {
    try {
      await deleteCurrencyFromCasino(currencyId);
      await reFetchCurrencySettingsFromCasino();
      toaster({ content: 'Currency Deleted' });
      
    } catch (e) {
      handleError(e);
    }
  };

  const patchCurrencyData = async (values: t.CurrencyPayload) => {
    try {
      await patchCurrencyDataFromCasino(values);
      await reFetchCurrencySettingsFromCasino();
      toaster({ content: 'Currency Settings updated' });
      
    } catch (e) {
      handleError(e);
    }
  };

  return { addNewCurrency, deleteCurrency, patchCurrencyData, isLoading: isLoadingPost };
};

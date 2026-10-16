import { StoreState } from '@/libs/store';

export const selectAvailableCurrencies = (app: StoreState) => app.currency.availableCurrencies;
export const selectFiatCurrencyCode = (app: StoreState) => app.currency.fiatCurrencyCode;

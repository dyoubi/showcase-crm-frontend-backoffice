import { BaseCurrencyInfo } from '@/domains/casino/currency';

export type CurrencyPayload = BaseCurrencyInfo;

export type AddNewCurrencyPayload = Pick<BaseCurrencyInfo, 'name' | 'iso' | 'fiat' | 'activate'>;

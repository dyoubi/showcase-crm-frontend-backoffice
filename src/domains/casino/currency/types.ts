export interface BaseCurrencyInfo {
  [x: string]: string | boolean;
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  name: string;
  iso: string;
  fiat: boolean;
  activate: boolean;
  casinoId: string;
}

export type GetCurrencyFromCasinoResponse = ReadonlyArray<BaseCurrencyInfo>;

export type GetCurrencyFromFinanceResponse = ReadonlyArray<{
  iso: string;
  name: string;
  symbol: string;
  decimals: number;
  defaultUnit: string;
  units: {
    [unit: string]: number;
  };
  fiat: boolean;
  psp: string;
}>;

export type PostAddNewCurrencyPayload = Pick<
  BaseCurrencyInfo,
  'name' | 'iso' | 'fiat' | 'activate'
>;

export type CurrencyPayload = BaseCurrencyInfo;

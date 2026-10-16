export interface Payload {
  name: string;
  iso: string;
  fiat: boolean;
  activate: boolean;
}

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

export type currencyDataFromFinance = {
  value: string;
  label: JSX.Element;
};

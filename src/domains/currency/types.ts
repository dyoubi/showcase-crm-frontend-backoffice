export interface GetCoinPriceResponse {
  bitcoin: { usd: number; eur: number };
  ethereum: { usd: number; eur: number };
  tron: { usd: number; eur: number };
}

export interface CryptoFiatRate {
  reference: string;
  coin: 'BTC' | 'ETH';
  fiat: 'CAD' | 'EUR' | 'GBP' | 'USD';
  averageRate: string;
  date: string;
}

export type GetCryptosFiatsRatesResponse = ReadonlyArray<{
  id: string;
  date: string;
  reference: string;
  coinIso: FiatCodes;
  pairIso: CryptoCodes;
  rate: string;
  provider: string;
  coinId: string;
}>;

export type CryptosFiatRatesHistory = ReadonlyArray<CryptoFiatRatesHistoryItem>;

export type CryptoFiatRatesHistoryItem = {
  id: string;
  timestamp: string;
  coinIso: FiatCodes;
  pairIso: CryptoCodes;
  rate: string;
};

export type GetCryptosFiatRatesHistoryResponse = {
  [pair: string]: CryptosFiatRatesHistory;
};

export enum ECryptoCodes {
  BTC = 'BTC',
  ETH = 'ETH',
  TRX = 'TRX',
};
export type CryptoCodes = `${ECryptoCodes}`;

export enum EFiatCodes {
  EUR = 'EUR',
  USD = 'USD',
};
export type FiatCodes = `${EFiatCodes}`;

export type CurrencyCodes = CryptoCodes | FiatCodes;

export interface RingCoin {
  code: string;
  decimal_digits: number;
  name: string;
  symbol: string;
  fiat: boolean;
  stable: boolean;
}

export type AvailableCurrency = Record<CurrencyCodes | string, RingCoin>;

export type GetCoinsResponse = Record<CurrencyCodes | string, RingCoin>;

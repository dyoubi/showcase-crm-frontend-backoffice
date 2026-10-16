export interface Casino {
  id: string;
  key: string;
  name: string;
  fiat: 'EUR' | 'USD';
  cashierKey: string | null;
  cashierId: string | null;
}

export type GetCasinosResponse = Array<Casino>;

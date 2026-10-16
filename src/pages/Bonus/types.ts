import { BonusComputeMode, BonusType } from '@/domains/casino/bonus';

export interface RankOverrideItem {
  amount?: string;
  hiddenBalancePercentage?: string;
  hiddenBalanceMinimum?: string;
  hiddenBalanceMaximum?: string;
}

export interface BonusForm {
  amount?: string;
  bonusReloadInterval?: string;
  bonusType?: BonusType;
  btcRating?: string;
  code?: string;
  description?: string;
  endDate?: string;
  ethRating?: string;
  fiat?: string;
  hiddenBalanceMaximum?: string;
  hiddenBalanceMinimum?: string;
  hiddenBalancePercentage?: string;
  name?: string;
  reloadIntervalUnity?: 'm' | 'h' | 'd';
  startDate?: string;
  trxRating?: string;

  // For auto bonus
  action?: 'deposit';
  onetime?: boolean;
  lifetimeValue?: number;
  lifetimeUnit?: 'm' | 'h' | 'd';
  computeMode?: BonusComputeMode;
  useActionCurrency?: boolean;
  limitations?: string[];
  filtersArray?: Array<{ key: string; value: string; id: string }>;
  rankOverrides?: ReadonlyArray<RankOverrideItem>;
}

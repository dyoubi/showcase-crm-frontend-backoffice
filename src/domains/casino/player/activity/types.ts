import { OperationCategoryEnum, Operation, OperationType } from '@/domains/casino/player/balance';
import { CryptoCodes } from '@/domains/currency';
import { Withdrawal } from '@/domains/finance/withdrawals';

import { Bonus } from '../../bonus';

// Types are re-defined here matching the definition on the operator-backend service.
type DailyActivity = Omit<Operation, 'type' | 'coin'> & {
  category: OperationCategoryEnum;
  coin: CryptoCodes;
  type: OperationType;
};

export type GetDailyActivityResponse = {
  count: number;
  data: ReadonlyArray<DailyActivity & {
    bonus?: Bonus
    withdrawal?: Withdrawal,
  }>;
};

export type GetDailyActivityFilter = {
  coin: CryptoCodes;
  details?: boolean;
  begin?: string;
  end?: string;
  limit?: number | null;
  offset?: number;
};

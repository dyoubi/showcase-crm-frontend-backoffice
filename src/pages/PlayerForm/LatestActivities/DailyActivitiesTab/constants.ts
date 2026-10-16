import { getBeginAndEndDates } from '@/domains/account/dateFormat';
import { GetDailyActivityFilter } from '@/domains/casino/player/activity';
import { ECryptoCodes } from '@/domains/currency';
import { EWithdrawalStatus } from '@/domains/finance/withdrawals';
import { Colors } from '@emotion/react';

export const DEFAULT_RESULTS_PER_PAGE = { label: 25, value: 25 };

export const RESULTS_PER_PAGE_OPTIONS = [
  DEFAULT_RESULTS_PER_PAGE, {
  label: 50,
  value: 50,
}, {
  label: 100,
  value: 100,
}, {
  label: 'All',
  value: null,
}];

export const DEFAULT_SELECTION = -7;
const { begin, end } = getBeginAndEndDates({ daysFromToday: DEFAULT_SELECTION });

export const DEFAULT_FILTER: GetDailyActivityFilter = {
  coin: ECryptoCodes.BTC,
  begin: begin.toISOString(),
  end: end.toISOString(),
  limit: DEFAULT_RESULTS_PER_PAGE.value,
  offset: 0,
};


export const WITHDRAWAL_STATUSES_TO_PILL_COLOR: Record<string, Colors> = {
  [EWithdrawalStatus.APPROVED]:        'primary',
  [EWithdrawalStatus.FAILURE]:         'primary',
  [EWithdrawalStatus.PENDING]:         'primary',
  [EWithdrawalStatus.SCHEDULED]:       'primary',
  [EWithdrawalStatus.PAID]:            'success',
  [EWithdrawalStatus.CANCELLED]:       'danger',
  [EWithdrawalStatus.DENIED_REFUND]:   'danger',
  [EWithdrawalStatus.DENIED_VOID_ALL]: 'danger',
  [EWithdrawalStatus.RETRACTED]:       'danger',
};

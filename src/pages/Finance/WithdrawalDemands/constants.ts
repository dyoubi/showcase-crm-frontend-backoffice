import { Colors } from '@emotion/react';

import { CryptoCodes } from '@/domains/currency';
import { EWithdrawalDemandStatus } from '@/domains/finance/withdrawals';

import {  WithdrawalFilters } from './types';

export const FILTERS_DEFAULT: WithdrawalFilters = {
  currency: { label: 'All', value: '' as CryptoCodes },
  status: { label: 'Open', value: EWithdrawalDemandStatus.OPEN },
  username: '',
};

export const USER_STATUSES_TO_COLOR: Record<string, Colors> = {
  'activated':    'primary',
  'banned':       'danger',
  'frozen':       'warning',
  'pending':      'primary',
  'self-exclude': 'danger',
  'validated':    'primary',
};

export const WITHDRAWAL_DEMAND_STATUSES_TO_PILL_COLOR: Record<string, Colors> = {
  [EWithdrawalDemandStatus.OPEN]:        'primary',
  [EWithdrawalDemandStatus.IN_PROGRESS]: 'primary',
  [EWithdrawalDemandStatus.BLOCKED]:     'warning',
  [EWithdrawalDemandStatus.APPROVED]:    'success',
  [EWithdrawalDemandStatus.DENIED]:      'danger',
  [EWithdrawalDemandStatus.RETRACTED]:   'danger',
};

export const STATUS_OPTIONS: { value: EWithdrawalDemandStatus | '', label: string }[] = [
  // Due to a bug on react-select library, the first element on the list is always focused.
  // This will cause some UX issues if the default and first options have the same background color
  // when it is sorted alphabetically.
  // See more at https://github.com/JedWatson/react-select/pull/4080
  { label: 'Open',        value: EWithdrawalDemandStatus.OPEN },
  { label: 'All',         value: '' },
  { label: 'In Progress', value: EWithdrawalDemandStatus.IN_PROGRESS },
  { label: 'Blocked',     value: EWithdrawalDemandStatus.BLOCKED },
  { label: 'Approved',    value: EWithdrawalDemandStatus.APPROVED },
  { label: 'Retracted',   value: EWithdrawalDemandStatus.RETRACTED },
  { label: 'Denied',      value: EWithdrawalDemandStatus.DENIED },
];

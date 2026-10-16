import { Colors } from '@emotion/react';

import { CryptoCodes } from '@/domains/currency';
import { EPaymentMandateStatus } from '@/domains/finance/payments';
import { PaymentFilters } from './types';

export const FILTERS_DEFAULT: PaymentFilters = {
  currency: { label: 'All', value: '' as CryptoCodes },
  status: { label: 'Open', value: EPaymentMandateStatus.OPEN },
};

export const PAYMENT_MANDATE_STATUSES_TO_PILL_COLOR: Record<string, Colors> = {
  [EPaymentMandateStatus.OPEN]:     'primary',
  [EPaymentMandateStatus.SENT]:     'success',
  [EPaymentMandateStatus.CANCELED]: 'warning',
  [EPaymentMandateStatus.ERROR]:    'danger',
};

export const STATUS_OPTIONS: { value: EPaymentMandateStatus | '', label: string }[] = [
  // Due to a bug on react-select library, the first element on the list is always focused.
  // This will cause some UX issues if the default and first options have the same background color
  // when it is sorted alphabetically.
  // See more at https://github.com/JedWatson/react-select/pull/4080
  { label: 'Open',     value: EPaymentMandateStatus.OPEN },
  { label: 'All',      value: '' },
  { label: 'Canceled', value: EPaymentMandateStatus.CANCELED },
  { label: 'Error',    value: EPaymentMandateStatus.ERROR },
  { label: 'Sent',     value: EPaymentMandateStatus.SENT },
];

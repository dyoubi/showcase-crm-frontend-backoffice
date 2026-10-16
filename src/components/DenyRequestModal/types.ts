import { Dispatch, SetStateAction } from 'react';
import { UseMutateAsyncFunction } from 'react-query';

import { PaymentMandate } from '@/domains/finance/payments';
import { WithdrawalDemand } from '@/domains/finance/withdrawals';
import { CurrencyCodes } from '@/domains/currency';

export interface DenyRequestModalProps {
  currency: CurrencyCodes,
  isModalOpen: boolean;
  requestAmount: number;
  requestId: WithdrawalDemand['id'] | PaymentMandate['id'];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  type: DenyRequest,
};

export interface DenyRefundForm {
  feesRefunded: boolean;
  refundedAmount: number;
}

export type MutationType<T extends DenyRefundForm | void> = UseMutateAsyncFunction<T, unknown, T, unknown>;

export enum EDenyRequest {
  DEMAND = 'DEMAND',
  MANDATE = 'MANDATE',
};
export type DenyRequest = `${EDenyRequest}`;

export interface DenyRequestHookProps {
  requestId: WithdrawalDemand['id'] | PaymentMandate['id'];
  type: DenyRequest,
};

export type UseDenyRequestValidationProps = {
  currency: CurrencyCodes;
  maxAmount: number;
};

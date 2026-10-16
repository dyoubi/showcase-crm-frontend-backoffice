import { OperationType } from '@/domains/casino/player/balance';

export interface AddOperationForm {
  operationType?: OperationType;
  balanceId?: string;
  amount?: number;
}

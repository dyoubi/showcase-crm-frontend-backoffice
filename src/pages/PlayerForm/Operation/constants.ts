import { OperationCategoryEnum } from '@/domains/casino/player/balance';
import { IconBitcoin, IconEthereum, IconTron } from '@/shared/Icons';

export const OperationCategoryOptions = [
  { label: 'Deposit', value: OperationCategoryEnum.DEPOSIT },
  { label: 'Gift', value: OperationCategoryEnum.GIFT },
  { label: 'Withdrawal', value: OperationCategoryEnum.WITHDRAWAL },
] as const;

export const icons = {
  BTC: IconBitcoin,
  ETH: IconEthereum,
  TRX: IconTron,
} as const;

import { ValueOf } from '@/utils/typescript.helpers';

export const Tabs = {
  SAME_AMOUNT_FOR_ALL: 'AMOUNT_FOR_ALL',
  AMOUNT_PER_RANK: 'AMOUNT_PER_RANK',
} as const;

export type AmountTabsType = ValueOf<typeof Tabs>;

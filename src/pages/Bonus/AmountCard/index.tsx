import { BonusType } from '@/domains/casino/bonus';
import { Tabs, TabsProps } from '@/shared/Tabs';

import * as c from '../constants';
import { SameAmountForAllInput } from './SameAmountForAllInput';
import { DifferentAmountsPerRankInputs } from './DifferentAmountsPerRankInputs';

interface AmountCardProps {
  bonusType: BonusType;
  selectedTabId: TabsProps['selectedTabId'];
  onSelect: TabsProps['onSelect'];
}

export const AmountCard = ({ bonusType, selectedTabId, onSelect }: AmountCardProps) => {
  return (
    <Tabs
      selectedTabId={selectedTabId}
      onSelect={onSelect}
      tabs={[
        {
          tabId: c.Tabs.SAME_AMOUNT_FOR_ALL,
          title: 'Amount',
          content: selectedTabId === c.Tabs.SAME_AMOUNT_FOR_ALL && (
            <SameAmountForAllInput bonusType={bonusType} />
          ),
        },
        {
          tabId: c.Tabs.AMOUNT_PER_RANK,
          title: 'Amount Per Rank',
          content: selectedTabId === c.Tabs.AMOUNT_PER_RANK && (
            <DifferentAmountsPerRankInputs bonusType={bonusType} />
          ),
        },
      ]}
    />
  );
};

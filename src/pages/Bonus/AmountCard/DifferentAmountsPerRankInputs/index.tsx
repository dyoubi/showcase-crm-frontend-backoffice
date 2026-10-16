import { BonusType } from '@/domains/casino/bonus';
import { PlayerRanks } from '@/domains/casino/player/rank';

import { GroupInputs } from '@/components/GroupInputs';
import { Collapse } from '@/components/Collapse';
import { InputPrice } from '@/components/InputPrice';

import { Flex } from '@/shared/Flex';
import { Input } from '@/shared/Input';

import { HiddenBalanceBonusInputs } from '../../HiddenBalanceBonusInputs';
import { useBonusFormContext } from '../../hooks';
import { getInput } from '../../logic.helper';
import { RankOverrideItem } from '../../types';

interface AmountCardProps {
  bonusType: BonusType;
}

export const DifferentAmountsPerRankInputs = ({ bonusType }: AmountCardProps) => {
  const formData = useBonusFormContext();
  const { getValues, setValue } = formData;
  const { getNumberProps } = getInput(formData);

  const updateAllRanksOverrides = (keyToChange: keyof RankOverrideItem, value: string) => {
    const newRankOverrides = (getValues('rankOverrides') || []).map((rankOverrides) => {
      if (!rankOverrides) return rankOverrides;
      return {
        ...rankOverrides,
        [keyToChange]: value,
      };
    });
    setValue('rankOverrides', newRankOverrides);
  };

  if (bonusType === 'retribution') {
    return (
      <Flex flexDirection="column" gap={24}>
        <Flex flexDirection="column" gap={16}>
          {PlayerRanks.map(({ id, label }) => (
            <HiddenBalanceBonusInputs
              title={label}
              key={id}
              hiddenBalancePercentageName={`rankOverrides.${id}.hiddenBalancePercentage`}
              hiddenBalanceMaxName={`rankOverrides.${id}.hiddenBalanceMaximum`}
              hiddenBalanceMinName={`rankOverrides.${id}.hiddenBalanceMinimum`}
            />
          ))}
        </Flex>

        <Collapse title="Set values for all ranks">
          <GroupInputs>
            <Input
              label="Amount on hidden balance percentage (in %)"
              onChange={({ target: { value } }) =>
                updateAllRanksOverrides('hiddenBalancePercentage', value)
              }
            />

            <InputPrice
              label="Hidden balance minimum (in €)"
              onChange={({ target: { value } }) =>
                updateAllRanksOverrides('hiddenBalanceMinimum', value)
              }
            />

            <InputPrice
              label="Hidden balance maximum (in €)"
              onChange={({ target: { value } }) =>
                updateAllRanksOverrides('hiddenBalanceMaximum', value)
              }
            />
          </GroupInputs>
        </Collapse>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" gap={24}>
      <GroupInputs>
        <InputPrice label="Rank : 0" {...getNumberProps('rankOverrides.0.amount')} />
        <InputPrice label="Rank : 1" {...getNumberProps('rankOverrides.1.amount')} />
        <InputPrice label="Rank : 2" {...getNumberProps('rankOverrides.2.amount')} />
      </GroupInputs>
      <GroupInputs>
        <InputPrice label="Rank : 3" {...getNumberProps('rankOverrides.3.amount')} />
        <InputPrice label="Rank : 4" {...getNumberProps('rankOverrides.4.amount')} />
        <InputPrice label="Rank : 5" {...getNumberProps('rankOverrides.5.amount')} />
      </GroupInputs>
      <GroupInputs>
        <InputPrice label="Rank : 6" {...getNumberProps('rankOverrides.6.amount')} />
        <InputPrice label="Rank : 7" {...getNumberProps('rankOverrides.7.amount')} />
        <div />
      </GroupInputs>

      <Collapse title="Set Amount For All Ranks">
          <InputPrice
            onChange={({ target: { value } }) => updateAllRanksOverrides('amount', value)}
            style={{ width: '243px' }}
          />
      </Collapse>
    </Flex>
  );
};

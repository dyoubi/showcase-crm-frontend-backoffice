import { FieldPath } from 'react-hook-form';

import { InputPrice } from '@/components/InputPrice';
import { GroupInputs } from '@/components/GroupInputs';
import { Input } from '@/shared/Input';

import { Flex } from '@/shared/Flex';

import { useBonusFormContext } from '../hooks';
import * as t from '../types';
import { getInput } from '../logic.helper';

interface HiddenBalanceBonusInputsProps<C = FieldPath<t.BonusForm>> {
  title?: string;
  hiddenBalancePercentageName: C;
  hiddenBalanceMinName: C;
  hiddenBalanceMaxName: C;
}

export const HiddenBalanceBonusInputs = ({
  title,
  hiddenBalancePercentageName,
  hiddenBalanceMinName,
  hiddenBalanceMaxName,
}: HiddenBalanceBonusInputsProps) => {
  const formData = useBonusFormContext();
  const { getNumberProps } = getInput(formData);

  return (
    <Flex flexDirection="column" gap={12}>
      {title && <h3 style={{ margin: 0 }}>{title}</h3>}

      <GroupInputs>
        <Input
          label="Amount on hidden balance percentage (in %)"
          {...getNumberProps(hiddenBalancePercentageName)}
        />

        <InputPrice
          label="Hidden balance minimum (in €)"
          {...getNumberProps(hiddenBalanceMinName)}
        />

        <InputPrice
          label="Hidden balance maximum (in €)"
          {...getNumberProps(hiddenBalanceMaxName)}
        />
      </GroupInputs>
    </Flex>
  );
};

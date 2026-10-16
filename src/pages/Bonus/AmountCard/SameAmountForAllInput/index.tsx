import { BonusType } from '@/domains/casino/bonus';
import { InputPrice } from '@/components/InputPrice';
import { HiddenBalanceBonusInputs } from '../../HiddenBalanceBonusInputs';
import { useBonusFormContext } from '../../hooks';
import { getInput } from '../../logic.helper';

interface AmountCardProps {
  bonusType: BonusType;
}

export const SameAmountForAllInput = ({ bonusType }: AmountCardProps) => {
  const formData = useBonusFormContext();
  const { getNumberProps } = getInput(formData);
  if (bonusType === 'retribution') {
    return (
      <HiddenBalanceBonusInputs
        key={bonusType}
        hiddenBalancePercentageName="hiddenBalancePercentage"
        hiddenBalanceMinName="hiddenBalanceMinimum"
        hiddenBalanceMaxName="hiddenBalanceMaximum"
      />
    );
  }

  return <InputPrice label="Amount" {...getNumberProps('amount')} key={bonusType} />;
};

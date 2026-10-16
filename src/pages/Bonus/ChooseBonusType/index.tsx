import { useWatch } from 'react-hook-form';
import { getInputProps, getControlledInputProps } from '@/libs/react-hook-form/utils';

import { EBonusType } from '@/domains/casino/bonus';

import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { Input } from '@/shared/Input';
import { RadioGroup } from '@/shared/RadioGroup';
import { TextArea } from '@/shared/TextArea';

import { DatePickerRHF } from '@/components/RHF/DatePicker';

import { useBonusFormContext, useCleanEndDate } from '../hooks';

const BONUS_TYPES = [{
  value: EBonusType.FIXE,
  label: 'Bonus Fixe',
}, {
  value: EBonusType.RETRIBUTION,
  label: 'Bonus Retribution',
}, {
  value: EBonusType.RELOAD,
  label: 'Bonus Reload',
}, {
  value: EBonusType.AUTO,
  label: 'Bonus Deposit',
}];

export const ChooseBonusType = () => {
  const formData = useBonusFormContext();

  const [startDate] = useWatch({
    control: formData.control,
    name: ['startDate'],
  });

  useCleanEndDate(formData, startDate);

  return (
    <Card>
      <Flex flexDirection="column" gap={18}>
        <RadioGroup
          name="bonusType"
          options={BONUS_TYPES}
          formData={formData}
          label="Bonus Type"
        />

        <Flex flexWrap="wrap" gap={16}>
          <Input
            {...getInputProps(formData, 'code')}
            label="Code"
            id="bonus-code"
            style={{ minWidth: '236px' }}
          />

          <DatePickerRHF
            {...getControlledInputProps(formData, 'startDate')}
            label="Start Date"
            rules={{ required: 'Required' }}
            showTimeInput
            style={{ flex: 1 }}
          />

          <DatePickerRHF
            {...getControlledInputProps(formData, 'endDate')}
            label="End Date"
            minDate={startDate ? new Date(startDate) : undefined}
            rules={{ required: 'Required' }}
            showTimeInput
            style={{ flex: 1 }}
          />
        </Flex>

        <Flex gap={24}>
          <Input
            {...getInputProps(formData, 'name')}
            label="Name"
            style={{ width: '100%' }}
          />
        </Flex>

        <TextArea
          {...getInputProps(formData, 'description')}
          label="Description"
        />
      </Flex>
    </Card>
  );
};

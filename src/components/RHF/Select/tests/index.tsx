import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import { getControlledInputProps } from '@/libs/react-hook-form/utils';
import { SelectRHF } from '..';

interface TestSelectRHFProps {
  formData: UseFormReturn<{ selectMono?: string; selectMulti?: string[] }>;
}

const options = [
  { label: 'Value 1', value: 'value 1' },
  { label: 'Value 2', value: 'value 2' },
  { label: 'Value 3', value: 'value 3' },
];

export const TestSelectRHF = ({ formData }: TestSelectRHFProps) => {
  const selectMonoValue = useWatch({ name: 'selectMono', control: formData.control });
  const selectMultiValue = useWatch({ name: 'selectMulti', control: formData.control });
  return (
    <div>
      <SelectRHF
        label="Mono select"
        {...getControlledInputProps(formData, 'selectMono')}
        options={options}
      />
      <SelectRHF
        label="Multi select"
        {...getControlledInputProps(formData, 'selectMulti')}
        options={options}
      />
      <span data-testid="select-mono-value">mono value: {selectMonoValue}</span>
      <span data-testid="select-multi-value">multi value: {selectMultiValue?.join(',')}</span>
    </div>
  );
};

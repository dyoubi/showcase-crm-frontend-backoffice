import { useState } from 'react';
import { GroupInputs } from '@/components/GroupInputs';
import { SelectRHF } from '@/components/RHF/Select';
import { Input } from '@/shared/Input';
import { Card } from '@/shared/Card';
import { getControlledInputProps } from '@/libs/react-hook-form/utils';
import { BonusComputeModeEnums } from '@/domains/casino/bonus';
import { Flex } from '@/shared/Flex';
import { Checkbox } from '@/shared/Checkbox';
import { Button } from '@/shared/Button';
import { RadioGroup } from '@/shared/RadioGroup';
import { currencyOptions } from '@/components/SelectCurrency/constants';
import { getInput } from '../logic.helper';
import { useBonusFormContext } from '../hooks';

const intervalUnityOption: ReadonlyArray<{
  label: string;
  value: 'm' | 'h' | 'd';
}> = [
  { label: 'Minute', value: 'm' },
  { label: 'Hour', value: 'h' },
  { label: 'Day', value: 'd' },
] as const;

export const AutoBonusSettings = () => {
  const formData = useBonusFormContext();
  const { register, watch, setValue, getValues } = formData;

  const { getNumberProps } = getInput(formData);
  const useActionCurrency = watch('useActionCurrency');

  const [filters, setFilters] = useState<Array<{ key: string; value: string; id: string }>>(
    getValues('filtersArray') || [],
  );

  const addFilter = () => {
    const newFilter = { key: '', value: '', id: Date.now().toString() };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: string) => {
    const updatedFilters = filters.filter((filter) => filter.id !== id);
    setFilters(updatedFilters);
    updateFiltersInForm(updatedFilters);
  };

  const updateFilter = (id: string, field: 'key' | 'value', newValue: string) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === id ? { ...filter, [field]: newValue } : filter,
    );
    setFilters(updatedFilters);
    updateFiltersInForm(updatedFilters);
  };

  const updateFiltersInForm = (filterList: typeof filters) => {
    setValue('filtersArray', filterList);
  };

  return (
    <Card title="Auto Bonus Settings">
      <Flex flexDirection="column" gap={24}>
        <Flex flexDirection="column" gap={24}>
          <h3 style={{ margin: 0}}>
            Amount
          </h3>

          <RadioGroup
            formData={formData}
            name="computeMode"
            options={[{
              label: 'Percentage',
              value: BonusComputeModeEnums.PERCENT,
            }, {
              label: 'Fixed Amount',
              value: BonusComputeModeEnums.ABSOLUTE,
            }]}
          />

          <GroupInputs>
            <Input {...getNumberProps('amount')} />
          </GroupInputs>
        </Flex>

        <div>
          <h3>Limits</h3>

          <GroupInputs>
            <Input label="Minimum Deposit Amount" {...getNumberProps('hiddenBalanceMinimum')} />
            <Input label="Maximum Deposit Amount" {...getNumberProps('hiddenBalanceMaximum')} />
          </GroupInputs>
        </div>

        <div>
          <h3>Configuration</h3>
          <Flex flexDirection="column" gap="16px">
            <Checkbox label="One-time bonus only" {...register('onetime')} />

            <Checkbox
              label="Force claim in the same currency"
              {...register('useActionCurrency')}
            />

            <SelectRHF
              isMulti
              label="Currencies Eligible For Bonus"
              isDisabled={useActionCurrency}
              options={currencyOptions}
              placeholder="Leave empty for all currencies"
              {...getControlledInputProps(formData, 'limitations')}
            />
          </Flex>
        </div>

        <div>
          <h3>Bonus Lifetime</h3>
          <GroupInputs>
            <Input label="Duration" {...getNumberProps('lifetimeValue')} />
            <SelectRHF
              label="Time Unit"
              options={intervalUnityOption}
              {...getControlledInputProps(formData, 'lifetimeUnit')}
            />
          </GroupInputs>
        </div>

        <div>
          <h3>Filters</h3>
          <Flex flexDirection="column" gap="16px">
            {filters.map((filter) => (
              <div key={filter.id}>
                <Flex flexDirection="row" gap="16px" alignItems="flex-end">
                  <Input
                    label="Filter Key"
                    value={filter.key}
                    onChange={(e) => updateFilter(filter.id, 'key', e.target.value)}
                    placeholder="Enter filter key"
                  />
                  <Input
                    label="Filter Value"
                    value={filter.value}
                    onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                    placeholder="Enter filter value"
                  />
                  <Button
                    onClick={() => removeFilter(filter.id)}
                    style={{
                      minWidth: 'auto',
                      padding: '8px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                    }}
                  >
                    ×
                  </Button>
                </Flex>
              </div>
            ))}
            <Button
              onClick={addFilter}
              style={{ alignSelf: 'flex-start', backgroundColor: '#6c757d', color: 'white' }}
            >
              + Add Filter
            </Button>
          </Flex>
        </div>
      </Flex>
    </Card>
  );
};

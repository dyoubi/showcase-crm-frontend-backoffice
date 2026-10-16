import { SingleValue } from 'react-select';

import { currencyOptions } from '@/components/SelectCurrency/constants';

import { Button } from '@/shared/Button';
import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { Select } from '@/shared/Select';

import * as t from './types';

import { FILTERS_DEFAULT, STATUS_OPTIONS } from './constants';

interface PaymentsFiltersProps {
  filters: t.PaymentFilters,
  setFilters: React.Dispatch<React.SetStateAction<t.PaymentFilters>>,
};

const PaymentsFilters = (props: PaymentsFiltersProps) => {
  const {
    filters,
    setFilters,
  } = props;

  const handleCurrencyChange = (newValue: SingleValue<t.CurrencyType>) => {
    if (!newValue) {
      return;
    }

    setFilters({
      ...filters,
      currency: newValue,
    });
  };

  const handleStatusChange = (newValue: SingleValue<t.StatusType>) => {
    if (!newValue) {
      return;
    }

    setFilters({
      ...filters,
      status: newValue,
    });
  };

  return (
    <Card title="Filters">
      <Flex flexDirection="row" alignItems="flex-end" gap={28}>
        <Flex flexDirection="row" gap={12}>
          <Select<t.CurrencyType>
            label="Currency"
            onChange={handleCurrencyChange}
            options={currencyOptions}
            value={filters.currency}
            width={160}
          />

          <Select<t.StatusType>
            label="Status"
            onChange={handleStatusChange}
            options={STATUS_OPTIONS}
            value={filters.status}
            width={160}
          />
        </Flex>

        <Button
          color="secondary"
          onClick={() => setFilters(FILTERS_DEFAULT)}
        >
          Reset
        </Button>
      </Flex>
    </Card>
  );
};


export default PaymentsFilters;

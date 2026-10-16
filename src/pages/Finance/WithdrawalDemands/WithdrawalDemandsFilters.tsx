import React, { useState } from 'react';
import { SingleValue } from 'react-select';

import { currencyOptions } from '@/components/SelectCurrency/constants';

import { Button } from '@/shared/Button';
import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { IconSearch } from '@/shared/Icons';
import { Input } from '@/shared/Input';
import { Select } from '@/shared/Select';

import * as t from './types';

import { FILTERS_DEFAULT, STATUS_OPTIONS } from './constants';

interface WithdrawalDemandsFiltersProps {
  filters: t.WithdrawalFilters,
  setFilters: React.Dispatch<React.SetStateAction<t.WithdrawalFilters>>,
};

const WithdrawalDemandsFilters = (props: WithdrawalDemandsFiltersProps) => {
  const {
    filters,
    setFilters,
  } = props;

  const [searchTerm, setSearchTerm] = useState<string>(filters.username);

  const handleCurrencyChange = (newValue: SingleValue<t.CurrencyType>) => {
    if (!newValue) {
      return;
    }

    setFilters({
      ...filters,
      currency: newValue,
    });
  };

  const handleReset = () => {
    setFilters(FILTERS_DEFAULT);
    setSearchTerm('');
  };

  const handleSearchChange = (event: { target: HTMLInputElement; }): void => {
    setSearchTerm(event.target.value);
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

  const handleSubmit = () => {
    setFilters({
      ...filters,
      username: searchTerm,
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

          <Input
            color="secondary"
            label="Username"
            leftIcon={IconSearch}
            onChange={handleSearchChange}
            value={searchTerm}
          />
        </Flex>

        <Flex flexDirection="row" gap={12}>
          <Button onClick={handleSubmit}>
            Search
          </Button>

          <Button
            color="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};


export default WithdrawalDemandsFilters;

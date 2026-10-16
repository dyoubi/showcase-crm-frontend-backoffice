import { ReactNode, useState } from 'react';
import { add } from 'date-fns';

import { Balance } from '@/domains/casino/player/balance';
import { DateRangePicker } from '@/shared/DateRangePicker';
import { Flex } from '@/shared/Flex';
import { Select, getOptionFromValue } from '@/shared/Select';

import { StyledDateRangePicker } from '../styles';

import * as c from './constants';

const getDateRangeWithDays = (value: number | null): [Date | null, Date | null] => ([add(new Date(), { days: value || undefined }), new Date()]);

type GameSessionTabFilterProps = {
  children?: ReactNode,
  defaultSelection?: number | string;
  handleDateInterval: ((value: { start: Date, end: Date }) => void),
  handleSelection: (value: number) => void;
  selectedCurrency: Balance['coin'];
  setCurrency: (value: Balance['coin']) => void;
};

export const GameSessionTabFilter = ({
  children,
  defaultSelection = c.DEFAULT_SELECTION,
  handleDateInterval,
  handleSelection,
  selectedCurrency,
  setCurrency,
}: GameSessionTabFilterProps) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(getDateRangeWithDays(c.DEFAULT_SELECTION));
  const [selection, setSelection] = useState<number | string>(defaultSelection);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    setSelection(c.DEFAULT_CUSTOM_SELECTION.value);

    if (dates[0] && dates[1]) {
      handleDateInterval({ start: dates[0], end: dates[1] })
    }
  };

  const handleSelectionChange = (newSelection: number) => {
    setDateRange(getDateRangeWithDays(newSelection));
    setSelection(newSelection);
    handleSelection(newSelection)
  };

  return (
    <Flex flexDirection="row" justifyContent="flex-start" gap={18}>
      <Select
        id="currency"
        label="Currency"
        options={c.CURRENCY_OPTIONS}
        value={getOptionFromValue(selectedCurrency, c.CURRENCY_OPTIONS)}
        onChange={(option) => setCurrency(option?.value as Balance['coin'])}
      />

      <Select
        id="selection"
        label="Selection"
        value={getOptionFromValue(selection, c.SELECTION_OPTIONS)}
        options={c.SELECTION_OPTIONS}
        onChange={(option) => handleSelectionChange(option?.value as number)}
      />

      <StyledDateRangePicker>
        <DateRangePicker
          value={dateRange}
          label="Select Date Range"
          color='primary'
          setValue={handleDateChange}
        />
      </StyledDateRangePicker>

      {children}
    </Flex>
  );
};

export default GameSessionTabFilter;

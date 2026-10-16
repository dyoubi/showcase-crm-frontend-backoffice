import { useMemo } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Colors } from '@emotion/react';

import 'react-datepicker/dist/react-datepicker.css';

import { useAppDateFormat } from '@/hooks';

import { Input, InputPropsType } from '../Input';
import { IconCalendar } from '../Icons';

import { getDateValue } from './logic.helper';

export interface DatePickerProps extends Omit<InputPropsType, 'value'> {
  setValue: (date: Date | null) => void;
  color?: Colors;
  minDate?: Date;
  showTimeInput?: boolean;
  value?: Date | string;
}

export const DatePicker = ({
  color,
  minDate,
  setValue,
  showTimeInput,
  value,
  ...rest
}: DatePickerProps) => {
  const dateValue = useMemo(() => getDateValue(value), [value]);
  const { dateFormat } = useAppDateFormat();

  return (
    <div>
      <ReactDatePicker
        customInput={<Input leftIcon={IconCalendar} color={color} {...rest} />}
        dateFormat={dateFormat}
        minDate={minDate}
        onChange={setValue}
        selected={dateValue}
        showMonthDropdown
        showTimeInput={showTimeInput}
        showYearDropdown
      />
    </div>
  );
};

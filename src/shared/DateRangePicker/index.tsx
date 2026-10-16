import { useMemo } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Colors } from '@emotion/react';

import { useAppDateFormat } from '../../hooks';

import 'react-datepicker/dist/react-datepicker.css';

import { Input, InputPropsType } from '../Input';
import { IconCalendar } from '../Icons';

import { getDateValue } from './logic.helper';

export interface DateRangePickerProps extends Omit<InputPropsType, 'value'> {
    setValue: (date: [Date | null, Date | null]) => void;
    color?: Colors;
    minDate?: Date;
    showTimeInput?: boolean;
    value?: [Date | null, Date | null];
}

export const DateRangePicker = ({
    setValue,
    color,
    minDate,
    showTimeInput,
    value = [null, null],
    ...rest
}: DateRangePickerProps) => {
    const dateRangeValue = useMemo(() => value.map(val => val !== null ? getDateValue(val) : undefined), [value]);
    const { dateFormat } = useAppDateFormat();
    const handleDateChange = (dates: [Date | null, Date | null]) => {
        setValue(dates);
    };

    return (
        <ReactDatePicker
            customInput={<Input leftIcon={IconCalendar} color={color} {...rest} />}
            dateFormat={dateFormat}
            endDate={dateRangeValue[1]}
            isClearable
            minDate={minDate}
            onChange={handleDateChange}
            selectsRange
            showMonthDropdown
            showTimeInput={showTimeInput}
            showYearDropdown
            startDate={dateRangeValue[0]}
        />
    );
};

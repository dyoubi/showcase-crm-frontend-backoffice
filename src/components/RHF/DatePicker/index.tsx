import { CSSProperties, ReactNode, useCallback } from 'react';
import { FieldValues, FieldPath, useController } from 'react-hook-form';
import { Colors } from '@emotion/react';

import { DatePicker, DatePickerProps } from '@/shared/DatePicker';

import { ControlledInputProps } from '../types';

export interface DatePickerRHFProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControlledInputProps<TFieldValues, TFieldName> {
  className?: string;
  color?: Colors;
  label?: ReactNode;
  minDate?: DatePickerProps['minDate'];
  showTimeInput?: DatePickerProps['showTimeInput'];
  style?: CSSProperties
}

export const DatePickerRHF = (props: DatePickerRHFProps) => {
  const {
    control,
    name,
    rules,
    label,
    color = 'primary',
    showTimeInput,
    minDate,
    className,
    style,
  } = props;

  const { field, formState } = useController({ control, name, rules });

  const error = formState?.errors[name];
  const { onChange, value } = field;

  return (
    <DatePicker
      className={className}
      key={value}
      value={new Date(value)}
      setValue={useCallback((newValue) => onChange(newValue?.toISOString()), [onChange])}
      label={label}
      caption={error?.message as string}
      color={error ? 'danger' : color}
      showTimeInput={showTimeInput}
      minDate={minDate}
      style={style}
    />
  );
};

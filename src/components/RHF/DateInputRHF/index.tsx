import { useCallback, useEffect, useState } from 'react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';

import { convertDateToString, convertStringToDate } from '@/utils';
import { InputMask, InputMaskProps } from '@/shared/InputMask';
import { IconCalendar } from '@/shared/Icons';

import { ControlledInputProps } from '../types';

type AllowedMaskProps = Omit<
  InputMaskProps,
  | 'iconLeft'
  | 'iconRight'
  | 'mask'
  | 'pattern'
  | 'placeholder'
  | 'parse'
  | 'format'
  | 'value'
  | 'onAccept'
  | 'onComplete'
>;

export interface DateInputRHFProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControlledInputProps<TFieldValues, TFieldName> {
  defaultValue?: string;
  style?: React.CSSProperties;
  inputstyle?: React.CSSProperties;
  customFormat?: string;
  pattern?: string;
}

export const DateInputRHF = ({
  name,
  control,
  defaultValue,
  rules,
  style,
  inputstyle,
  customFormat = 'dd/MM/yyyy',
  pattern = 'd{/}`m{/}`Y',
  ...restProps
}: DateInputRHFProps & AllowedMaskProps) => {
  const [inputValue, setValue] = useState('');
  const { field, formState } = useController({
    rules,
    name,
    control,
    defaultValue,
  });

  const error = formState?.errors[name];
  const { onChange, value } = field;

  const parseCb = useCallback(
    (dateStr: string) => convertStringToDate(dateStr, customFormat),
    [customFormat],
  );

  const formatCb = useCallback(
    (date: Date) => convertDateToString(date, customFormat),
    [customFormat],
  );

  const onComplete = useCallback(
    (dateStr: string) => onChange(convertStringToDate(dateStr, customFormat).toISOString()),
    [onChange, customFormat],
  );

  const onAccept = useCallback(
    (newValue: string) => {
      if (value) {
        onChange(undefined);
      }
      setValue(newValue);
    },
    [onChange, setValue, value],
  );

  useEffect(() => {
    const initialValue = defaultValue || value;

    if (!initialValue) return;

    const date = new Date(initialValue);
    setValue(formatCb(date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InputMask
      {...restProps}
      value={inputValue}
      leftIcon={IconCalendar}
      mask={Date}
      color={error ? 'danger' : 'primary'}
      pattern={pattern}
      placeholder={customFormat.toLowerCase()}
      parse={parseCb}
      format={formatCb}
      caption={error?.message as string}
      onComplete={onComplete}
      onAccept={onAccept}
      style={style}
      inputstyle={inputstyle}
    />
  );
};

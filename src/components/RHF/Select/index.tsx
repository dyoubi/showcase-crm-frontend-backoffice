import { FieldPath, FieldValues, useController } from 'react-hook-form';
import { GroupBase } from 'react-select';

import {
  Select,
  SelectProps,
  OptionType,
  isMultipleValue,
  isSingleValue,
  getOptionFromValue,
} from '@/shared/Select';
import { ControlledInputProps } from '../types';

export interface SelectRHFProps<
  Option extends OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<SelectProps<Option, IsMulti, Group>, 'onChange' | 'name'>,
    ControlledInputProps<TFieldValues, TFieldName> {}

export const SelectRHF = <
  Option extends OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  ...rest
}: SelectRHFProps<Option, IsMulti, Group, TFieldValues, TFieldName>) => {
  const { field, formState } = useController({ control, name, rules });
  const error = formState?.errors[name];
  const { onChange, value } = field;

  return (
    <Select
      name={name}
      color={error ? 'danger' : 'primary'}
      caption={error?.message as string}
      {...rest}
      onChange={(newValue) => {
        if (isMultipleValue(newValue)) {
          onChange(newValue?.map((o) => o.value));
        }

        if (isSingleValue(newValue)) {
          onChange(newValue?.value);
        }
      }}
      value={
        rest.isMulti
          ? value?.map((a: string) => getOptionFromValue(a, rest?.options))
          : getOptionFromValue(value, rest?.options)
      }
    />
  );
};

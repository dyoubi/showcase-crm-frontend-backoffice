import { CSSProperties, ReactNode } from 'react';
import { Colors } from '@emotion/react';
import { GroupBase, OnChangeValue, Props } from 'react-select';

export interface AdditionalProps<Option, IsMulti extends boolean> {
  colors?: Colors;
  className?: string;
  placeholder?: ReactNode;
  name?: string;
  isDisabled?: boolean;
  isSearchable?: boolean;
  'data-testid'?: string;
  color?: string | Colors;
  label?: ReactNode;
  caption?: ReactNode;
  width?: number | string;
  style?: CSSProperties;
  optionStyle?: CSSProperties;
  noOptionsText?: string;
  height?: number;
  padding?: string;
  onChange?: (newValue: OnChangeValue<Option, IsMulti>) => void;
}

export interface OptionType<T = string | boolean | number | null> {
  label: ReactNode;
  value: T;
}

export type SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<Props<Option, IsMulti, Group>, 'onChange'> & AdditionalProps<Option, IsMulti>;

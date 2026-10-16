import { GroupBase, StylesConfig, MultiValue, SingleValue } from 'react-select';
import { Colors, Theme } from '@emotion/react';

import * as t from './types';

export const isMultipleValue = <Option extends t.OptionType>(
  value: unknown,
): value is MultiValue<Option> => Array.isArray(value);

export const isSingleValue = <Option extends t.OptionType>(
  value: unknown,
): value is SingleValue<Option> => !isMultipleValue(value);

export const getStyles = <
  Option extends t.OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  theme: Theme,
  color: string,
  height?: number,
  padding?: string,
): StylesConfig<Option, IsMulti, Group> => ({
  input: (styles) => ({
    ...styles,
    color: theme.typography.colors.primary,
  }),
  container: (styles) => ({
    ...styles,
    cursor: 'pointer',
    width: '100%',
    color: theme.typography.colors.primary,
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    minHeight: height || theme.sizes.input.height,
    border: theme.colors[color as Colors]
      ? `1px solid ${theme.colors[color as Colors].main}`
      : `1px solid ${color}`,
    borderRadius: 6,
    cursor: 'pointer',
    boxShadow: '',
    '&:hover': {
      borderColor: theme.typography.colors.primary,
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: theme.typography.colors.primary,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: theme.components.containers.backgroundColor,
    borderRadius: 6,
    overflow: 'hidden',
    padding: 0,
    zIndex: 3,
  }),
  valueContainer: (styles) => ({
    ...styles,
    marginLeft: theme.spaces.margin.s,
    padding: padding || `6px 0px`,
  }),
});

export const getOptionFromValue = <
  Option extends t.OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  value?: t.OptionType['value'],
  options: t.SelectProps<Option, IsMulti, Group>['options'] = [],
) => {
  const isOption = (a: unknown): a is Option => !!(a as Option)?.value;
  const isGroup = (a: unknown): a is Group => !isOption(a);

  for (let i = 0; i < options.length; i += 1) {
    const option = options[i];

    if (isOption(option)) {
      if (option.value === value) {
        return option;
      }
    }

    if (isGroup(option)) {
      const matchedOption = option?.options?.find((o) => o.value === value);

      if (matchedOption) {
        return matchedOption;
      }
    }
  }

  return undefined;
};

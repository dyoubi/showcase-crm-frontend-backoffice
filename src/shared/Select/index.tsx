import { useCallback, useId, useMemo } from 'react';
import SelectRaw, { components, GroupBase, OnChangeValue } from 'react-select';
import { useTheme } from '@emotion/react';

import { Spacer } from '../Spacer';
import { IconLoader } from '../Icons';
import { Label } from '../Label';
import { FeedbackMessage } from '../FeedbackMessage';

import { MultiValue } from './MultiValue';
import * as Styled from './styles';
import { getStyles, isMultipleValue, isSingleValue, getOptionFromValue } from './logic.helper';
import * as t from './types';
import { createOptionWithStyle } from './OptionRender/utils';

export const Select = <
  Option extends t.OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  value,
  onChange,
  isMulti,
  options,
  placeholder,
  className,
  name,
  isDisabled,
  isSearchable,
  color = 'primary',
  'data-testid': dataTestId,
  label,
  caption,
  width,
  style = {},
  noOptionsText,
  isLoading,
  onInputChange,
  height,
  padding,
  optionStyle = {},
}: t.SelectProps<Option, IsMulti, Group>) => {
  const theme = useTheme();
  const selectId = useId();

  const OptionWithStyle = useMemo(() => createOptionWithStyle<Option, IsMulti>(optionStyle), [optionStyle]);

  return (
    <div
      className={className}
      style={{ width, ...style }}
      data-disabled={isDisabled}
      data-testid={name || dataTestId}
    >
      {(label) ? (
        <Label htmlFor={selectId}>
          {label}
        </Label>
      ): null}

      <SelectRaw<Option, IsMulti, Group>
        inputId={selectId}
        value={value}
        options={options}
        onInputChange={onInputChange}
        isLoading={isLoading}
        onChange={useCallback(
          (newOption: OnChangeValue<Option, IsMulti>) => onChange && onChange(newOption),
          [onChange],
        )}
        isMulti={isMulti}
        components={{
          // eslint-disable-next-line react/no-unstable-nested-components
          LoadingIndicator: () => (
            <>
              <IconLoader size="m" color={theme.typography.colors.primary} data-testid="loading-icon" />
              <Spacer size="m" />
            </>
          ),
          DropdownIndicator: useCallback(
            // eslint-disable-next-line react/no-unstable-nested-components
            () => <Styled.ChevronDown color={theme.typography.colors.primary} size="m" />,
            [theme],
          ),
          // @ts-ignore
          Option: OptionWithStyle,
          // eslint-disable-next-line react/no-unstable-nested-components
          NoOptionsMessage: (props) => (
            <components.NoOptionsMessage {...props}>
              <span>{noOptionsText}</span>
            </components.NoOptionsMessage>
          ),
          MultiValue,
        }}
        styles={getStyles<Option, IsMulti, Group>(theme, color, height, padding)}
        placeholder={placeholder}
        name={name}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
      />

      {caption && <FeedbackMessage color={color}>{caption}</FeedbackMessage>}
    </div>
  );
};

Select.displayName = 'Select';

export * from './types';
export { getStyles, isMultipleValue, isSingleValue, getOptionFromValue };

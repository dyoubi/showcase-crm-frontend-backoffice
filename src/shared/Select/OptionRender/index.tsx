import React from 'react';
import { OptionProps } from 'react-select';

import * as t from '../types';

import * as Styled from './styles';

type CustomOptionProps<
  Option extends t.OptionType,
  IsMulti extends boolean = false,
> = OptionProps<Option, IsMulti> & {
  optionStyle?: React.CSSProperties;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const OptionRender = <
  Option extends t.OptionType,
  IsMulti extends boolean = false,
>({
  innerProps,
  label,
  isSelected,
  isFocused,
  optionStyle,
}: CustomOptionProps<Option, IsMulti>) => {
  return (
    <Styled.Container
      {...innerProps}
      isSelected={isSelected}
      isFocused={isFocused}
      data-testid="select-option"
      onMouseMove={undefined}
      onMouseOver={undefined}
      style={optionStyle}
    >
      {label}
    </Styled.Container>
  );
};

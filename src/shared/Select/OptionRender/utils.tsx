import React from 'react';
import { OptionProps } from 'react-select';

import * as t from '../types';

import { OptionRender } from './index';

export const createOptionWithStyle = <
  T extends t.OptionType,
  IsMulti extends boolean = false,
>(optionStyle?: React.CSSProperties) => {
  return function OptionWithStyle(props: OptionProps<T, IsMulti>) {
    return <OptionRender {...props} optionStyle={optionStyle} />;
  };
};

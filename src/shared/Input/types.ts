import React, { CSSProperties } from 'react';
import { Colors } from '@emotion/react';

import { ButtonPropsType } from '../Button/Button';
import { IconFC } from '../Icons/types';

export type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface InputPropsType extends NativeInputProps {
  buttonContent?: React.ReactNode;
  buttonProps?: ButtonPropsType;
  caption?: React.ReactNode;
  color?: Colors;
  flex?: CSSProperties['flex'];
  inputstyle?: React.CSSProperties;
  label?: React.ReactNode;
  leftIcon?: IconFC;
  rightIcon?: IconFC;
  width?: number | string;
}

import { CSSProperties, ReactNode } from 'react';
import { Colors } from '@emotion/react';

import { ButtonPropsType } from '../Button';
import { IconFC } from '../Icons/types';

export interface InputWrapperProps {
  disabled?: boolean;
  className?: string;
  color?: Colors;
  leftIcon?: IconFC;
  rightIcon?: IconFC;
  children?: ReactNode;
  buttonContent?: React.ReactNode;
  buttonProps?: ButtonPropsType;
  caption?: React.ReactNode;
  label?: React.ReactNode;
  width?: number | string;
  flex?: CSSProperties['flex'];
}

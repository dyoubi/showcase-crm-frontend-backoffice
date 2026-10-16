import React from 'react';
import { Colors } from '@emotion/react';

import { IconFC } from '../Icons/types';

export interface BaseButtonType {
  color?: Colors;
  leftIcon?: IconFC;
  rightIcon?: IconFC;
  size?: 'l' | 'xl';
  width?: string | number;
}

export type NativeButtonInputProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonPropsType = NativeButtonInputProps & BaseButtonType;

export type NativeLinkInputProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export type LinkButtonType = NativeLinkInputProps & BaseButtonType & {
  disabled?: boolean
};

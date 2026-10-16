import React from 'react';
import { Colors } from '@emotion/react';

export type NativeInputProps = React.DetailedHTMLProps<
  React.DetailsHTMLAttributes<HTMLSpanElement>,
  HTMLButtonElement
>;

export interface BadgePropsType extends NativeInputProps {
  color?: Colors | string;
}

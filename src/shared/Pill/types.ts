import { Colors } from '@emotion/react';
import React from 'react';

export type NativeInputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export interface PillPropsType extends NativeInputProps {
  children?: React.ReactNode;
  color?: Colors;
}

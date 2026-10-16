import React from 'react';
import { Colors } from '@emotion/react';

export type NativeInputProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaPropsType extends NativeInputProps {
  color?: Colors;
  caption?: React.ReactNode;
  label?: React.ReactNode;
  resize?: 'vertical' | 'horizontal';
  minHeight?: string | number;
  'data-testid'?: string;
}

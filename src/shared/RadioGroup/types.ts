import { ReactNode } from 'react';
import { Colors } from '@emotion/react';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

export type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface RadioInputProps extends NativeInputProps {
  label: ReactNode,
  value: string,
}

export interface RadioGroupProps<T extends FieldValues> {
  options: RadioInputProps[];
  color?: Colors;
  caption?: ReactNode;
  formData?: UseFormReturn<T>
  name: FieldPath<T>;
  label?: ReactNode;
}

import React from 'react';

export type NativeTableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export type StackPropsType = NativeTableProps;

export type NativeTrProps = React.DetailedHTMLProps<
  React.HTMLProps<HTMLTableRowElement>,
  HTMLTableRowElement
>;

export interface StackItemPropsType extends Omit<NativeTrProps, 'value' | 'as'> {
  align?: 'left' | 'right',
  label: string,
  value: React.ReactNode,
};

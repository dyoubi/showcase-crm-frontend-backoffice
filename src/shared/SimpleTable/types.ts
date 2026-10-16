import React from 'react';

export type NativeTableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export interface SimpleTablePropsType extends NativeTableProps {
  size?: 'xxs' | 'xs' | 's'
};

import React from 'react';
import { Sizes } from '@emotion/react';

export type NativeTableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export interface TablePropsType extends NativeTableProps {
  fullWidth?: boolean,
  innerBorder?: boolean,
  isDarkMode?: boolean,
  overflow?: boolean,
  size?: Sizes,
  zebra?: boolean,
}

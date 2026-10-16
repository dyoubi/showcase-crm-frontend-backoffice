import React from 'react';
import { Sizes } from '@emotion/react';

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * TODO When refactoring theme remove all these values &
   * use primary, secondary & tertiary from theme export
   * */
  color?: string | ColorVariant;
  size?: Sizes | number | undefined;
}

export type IconFC =
  | React.FC<IconProps>
  | React.MemoExoticComponent<(props: IconProps) => JSX.Element>;

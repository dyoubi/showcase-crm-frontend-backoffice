import { ReactNode } from 'react';
import { Colors } from '@emotion/react';

import { IconFC } from '../Icons/types';

type NativeDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface CardProps extends Omit<NativeDivProps, 'title' | 'ref'> {
  children?: ReactNode;
  icon?: IconFC | ReactNode;
  leftContent?: ReactNode;
  loadingOverlay?: boolean;
  loadingOverlayDataTestId?: string;
  rightContent?: ReactNode;
  status?: Colors | 'base';
  title?: ReactNode;
  topContent?: ReactNode;
  width?: number | string;
}

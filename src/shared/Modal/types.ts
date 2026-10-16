import { ReactNode } from 'react';

import { CardProps } from '../Card';

export type ModalBackground = 'base' | 'dimmed';

export interface ModalProps extends CardProps {
  show: boolean;
  background?: ModalBackground;
  'data-testid'?: string;
  children?: ReactNode;
  height?: string | number;
  isClosable?: boolean;
  isOverflow?: boolean;
  maxWidth?: string | number;
  minHeight?: string | number;
  onHide?: () => void;
  title?: ReactNode;
  topContent?: ReactNode;
  width?: string | number;
}

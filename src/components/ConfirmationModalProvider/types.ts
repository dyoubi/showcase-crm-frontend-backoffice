import { ReactNode } from 'react';

import { ModalProps } from '@/shared/Modal/types';

export type ConfirmationModalState = {
  cancelText?: string;
  confirmText?: string;
  content?: ReactNode;
  height?: ModalProps['height'];
  icon?: ModalProps['icon'];
  isDeleting?: boolean;
  maxWidth?: string | number;
  minHeight?: ModalProps['minHeight'];
  onConfirm?: () => void;
  isOverflow?: ModalProps['isOverflow'];
  title?: ReactNode;
  width?: ModalProps['width'];
};

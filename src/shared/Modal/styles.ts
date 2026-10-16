import styled from '@emotion/styled';

import { Card } from '@/shared/Card';
import { IconClose } from '@/shared/Icons';

import { convertHexColorToRgba } from '@/utils/color';

import { ModalBackground } from './types';

export const Layer = styled.div(({ theme }) => ({
  position: 'fixed',
  zIndex: 1000, // To be determined
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
  backgroundColor: `${convertHexColorToRgba(theme.colors.tertiary.main, 0.9)}`,
}));

export const Wrapper = styled.div({
  height: '100%',
  transform: 'none',
  display: 'flex',
  alignItems: 'center',
});

export const Content = styled(Card)<{
  background: ModalBackground,
  height?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  isOverflow?: boolean;
}>(({
  background,
  height,
  maxWidth,
  minHeight,
  isOverflow = true,
  theme,
}) => ({
  position: 'relative',
  backgroundColor: (background === 'base') ? theme.components.containers.backgroundColor : theme.components.body.backgroundColor,
  height,
  maxHeight: '90%',
  minHeight,
  maxWidth,
  overflowY: (isOverflow) ? 'scroll' : 'inherit',
  margin: '0 auto',
}));

export const CloseIcon = styled(IconClose)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.typography.colors.primary,
}));

import styled from '@emotion/styled';

import { IconClose } from '../Icons';

export const Container = styled.div<{ open: boolean }>(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: open ? 0 : -450,
  width: 400,
  padding: theme.spaces.margin.m,
  transition: 'right 300ms ease-in-out',
  color: theme.typography.colors.primary,
  backgroundColor: theme.components.containers.backgroundColor,
  boxShadow: `0 0.9px 1px ${theme.colors.tertiary.main},0 3.1px 1px ${theme.colors.tertiary.main},0 14px 20px ${theme.colors.tertiary.main}`,
  // `0 0.9px 1.5px rgba(0, 0, 0, 0.03),0 3.1px 5.5px rgba(0, 0, 0, 0.08),0 14px 25px rgba(0, 0, 0, 0.12)`,
}));

export const CloseIcon = styled(IconClose)(() => ({
  cursor: 'pointer',
}));

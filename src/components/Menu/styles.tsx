import styled from '@emotion/styled';
import { Link as RouterLinkRaw } from 'react-router-dom';

import { ANIMATION_DURATION, CLOSED_SIZE } from './constants';

export const PageContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  color: theme.typography.colors.primary,
}));

export const MenuContainer = styled.div<{ size: number }>(({ theme, size }) => ({
  padding: `${theme.spaces.padding.l} 0`,
  zIndex: 100,
  overflowY: 'scroll',
  width: size,
  transition: `width ${ANIMATION_DURATION}ms ease-in-out`,
  position: 'fixed',
  left: 0,
  backgroundColor: theme.components.containers.backgroundColor,
  color: theme.typography.colors.primary,
  top: 0,
  bottom: 0,
  boxShadow: '0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%)',
  display: 'flex',
  flexDirection: 'column',
}));

export const BodyContainer = styled.div({
  paddingLeft: CLOSED_SIZE,
  width: `calc(100vw - ${CLOSED_SIZE}px)`,
  flex: 1,
});

export const Divider = styled.div(({ theme }) => ({
  borderBottom: '1px solid currentColor',
  width: 'calc(100% - 3px)',
  margin: `${theme.spaces.margin.xs} 3px`,
}));

export const Link = styled.a({
  textDecoration: 'none',
});

export const RouterLink = styled(RouterLinkRaw)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.typography.colors.primary,
}));

export const VoidSpace = styled.div({
  flex: 1,
});

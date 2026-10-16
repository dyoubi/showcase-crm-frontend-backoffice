import styled from '@emotion/styled';

import { ANIMATION_DURATION, SUBMENU_ITEM_HEIGHT } from '../constants';

export const Container = styled.div<{ isCollapsed: boolean }>`
  &:active {
    transition: opacity 50ms ease-in-out;
    opacity: 0.6;
  }
  display: flex;
  flex-direction: row;
  padding-left: ${({ theme }) => theme.spaces.padding.xxl};
  height: ${({ isCollapsed }) => (isCollapsed ? 0 : SUBMENU_ITEM_HEIGHT)}px;
  margin-bottom: ${({ isCollapsed, theme }) => (isCollapsed ? 0 : theme.spaces.padding.l)};
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  transition: all ${ANIMATION_DURATION}ms ease-in-out;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Item = styled.div<{ marginLeft?: string }>(({ marginLeft }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft,
  cursor: 'pointer',
}));

export const Text = styled.span({
  borderBottom: '1px solid',
  borderColor: 'transparent',
  '&:hover': {
    borderColor: 'currentColor',
  },
});

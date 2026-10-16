import styled from '@emotion/styled';

import { ANIMATION_DURATION, CLOSED_SIZE, MENU_ITEM_ACTIVE_BG_COLOR } from '../constants';

export const MENU_ITEM_VERTICAL_MARGIN = 8;
export const MENU_ITEM_HORIZONTAL_MARGIN = 16;
export const MENU_ICON_SIZE = CLOSED_SIZE - 2 * MENU_ITEM_HORIZONTAL_MARGIN;

export const Container = styled.div<{ isClickable: boolean }>({
  margin: `${MENU_ITEM_VERTICAL_MARGIN}px ${MENU_ITEM_HORIZONTAL_MARGIN}px`,
  borderRadius: 8,
  display: 'flex',
  transition: 'background-color 100ms ease-in-out',

  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgb(73, 73, 73, 0.2)',
  },

  '&:active': {
    backgroundColor: MENU_ITEM_ACTIVE_BG_COLOR,
  },
});

export const Icon = styled.div({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: MENU_ICON_SIZE,
  height: MENU_ICON_SIZE,
});

export const ItemContent = styled.div<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  marginLeft: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flex',
  alignItems: 'center',
  width: isCollapsed ? 0 : '100%',
  opacity: isCollapsed ? 0 : 1,
  transition: `opacity ${ANIMATION_DURATION}ms ease-in-out, width ${ANIMATION_DURATION}ms ease-in-out`,
}));

export const ItemText = styled.div({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

import styled from '@emotion/styled';

import { MenuItem as MenuItemRaw } from '../MenuItem';
import { MENU_ITEM_ACTIVE_BG_COLOR } from '../constants';

export const MenuItem = styled(MenuItemRaw)(({ theme }) => ({
  marginBottom: theme.spaces.margin.xs,
  '&:hover': {
    backgroundColor: 'rgb(73, 73, 73, 0.1)',
  },
  '&:active': {
    backgroundColor: MENU_ITEM_ACTIVE_BG_COLOR,
  },
}));

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as c from './constants';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    subMenusOpenened: {
      [c.SUBMENUS.MARKETING]: false,
      [c.SUBMENUS.GAMES]: false,
      [c.SUBMENUS.FINANCE]: false,
    },
  },
  reducers: {
    toggleSubmenu: (state, b: PayloadAction<c.SubMenusType>) => {
      state.subMenusOpenened[b.payload] = !state.subMenusOpenened[b.payload];
    },
  },
});

export const menuReducer = menuSlice.reducer;

export const { toggleSubmenu } = menuSlice.actions;

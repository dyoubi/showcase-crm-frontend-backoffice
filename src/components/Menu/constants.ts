import { ValueOf } from '@/utils/typescript.helpers';

export const CLOSED_SIZE = 76;
export const OPENED_SIZE = 268;
export const ANIMATION_DURATION = 400;
export const SUBMENU_ITEM_HEIGHT = 26;
export const MENU_ITEM_ACTIVE_BG_COLOR = 'rgb(73, 73, 73, 0.4)';

export const SUBMENUS = {
  MARKETING: 'MARKETING',
  GAMES: 'GAMES',
  FINANCE: 'FINANCE',
} as const;

export type SubMenusType = ValueOf<typeof SUBMENUS>;

export const SUBMENUS_INITIAL_STATE = {
  subMenusOpenened: {
    [SUBMENUS.MARKETING]: false,
    [SUBMENUS.GAMES]: false,
    [SUBMENUS.FINANCE]: false,
  },
} as const;

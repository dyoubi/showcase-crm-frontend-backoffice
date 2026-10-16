import { ReactNode, useReducer } from 'react';
import { useAuth } from 'react-oidc-context';

import { useLogout } from '@/domains/account/auth/hooks';
import { RESTRICTED_EMAILS } from '@/constants';
import {
  IconAbacus,
  IconArticle,
  IconCarouselHorizontal,
  IconCategory,
  IconChevronDown,
  IconChevronLeft,
  IconDashboard,
  IconDiscount,
  IconGamepad,
  IconGift,
  IconImage,
  IconList,
  IconLogout,
  IconPayment,
  IconProvider,
  IconReceipt,
  IconSettings,
  IconSpeakerphone,
  IconTags,
} from '@/shared/Icons';

import { routes } from '@/libs/router/constants';
import { Spacer } from '@/shared/Spacer';
import { useHover } from '../../hooks';

import {
  CLOSED_SIZE,
  OPENED_SIZE,
  SUBMENUS_INITIAL_STATE,
  SubMenusType,
  SUBMENUS,
} from './constants';
import { MenuItem } from './MenuItem';
import { AccountMenuItem } from './AccountMenuItem';
import { SubMenu } from './SubMenu';
import { SubMenuItem } from './SubMenuItem';

import { toggleSubmenu, menuReducer } from './slice';
import * as Styled from './styles';
import { GroupMenu } from './GroupMenu';

export interface MenuProps {
  children: ReactNode;
}

export const Menu = ({ children }: MenuProps) => {
  // hooks
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const [{ subMenusOpenened }, dispatch] = useReducer(menuReducer, SUBMENUS_INITIAL_STATE);
  const { user } = useAuth();

  // constants
  const size = isHovered ? OPENED_SIZE : CLOSED_SIZE;
  const isCollapsed = !isHovered;
  const userEmail = user?.profile?.email;
  const isRestricted = userEmail && RESTRICTED_EMAILS.includes(userEmail);

  // callback
  const onClickLogout = useLogout();
  const getSubMenuProps = (submenu: SubMenusType) => ({
    onClick: () => dispatch(toggleSubmenu(submenu)),
    isCollapsed,
    iconRight: subMenusOpenened[submenu] ? IconChevronLeft : IconChevronDown,
  });

  const getSubMenuItemsProps = (submenu: SubMenusType) => ({
    isCollapsed: isHovered ? subMenusOpenened[submenu] : true,
  });

  return (
    <Styled.PageContainer>
      <Styled.MenuContainer ref={hoverRef} size={size} data-testid="Menu">
        <AccountMenuItem isCollapsed={isCollapsed} />
        <Spacer size="xs" />
        <Styled.RouterLink to={routes.DASHBOARD}>
          <MenuItem iconLeft={IconDashboard} isCollapsed={isCollapsed}>
            Dashboard
          </MenuItem>
        </Styled.RouterLink>

        {!isRestricted && (
          <GroupMenu title="CMS" hide={isCollapsed}>
            <SubMenu
              title="Marketing"
              iconLeft={IconSpeakerphone}
              {...getSubMenuProps(SUBMENUS.MARKETING)}
            >
              <Styled.RouterLink to={routes.CAROUSELS}>
                <SubMenuItem
                  icon={IconCarouselHorizontal}
                  {...getSubMenuItemsProps(SUBMENUS.MARKETING)}
                >
                  Carousels
                </SubMenuItem>
              </Styled.RouterLink>
              <Styled.RouterLink to={routes.PROMOTIONS}>
                <SubMenuItem icon={IconDiscount} {...getSubMenuItemsProps(SUBMENUS.MARKETING)}>
                  Promotions
                </SubMenuItem>
              </Styled.RouterLink>
              <Styled.RouterLink to={routes.ARTICLES}>
                <SubMenuItem icon={IconArticle} {...getSubMenuItemsProps(SUBMENUS.MARKETING)}>
                  Articles
                </SubMenuItem>
              </Styled.RouterLink>
              <Styled.RouterLink to={routes.BONUSES}>
                <SubMenuItem icon={IconGift} {...getSubMenuItemsProps(SUBMENUS.MARKETING)}>
                  Bonus
                </SubMenuItem>
              </Styled.RouterLink>
              <Styled.RouterLink to={routes.MEDIAMANAGER}>
                <SubMenuItem icon={IconImage} {...getSubMenuItemsProps(SUBMENUS.MARKETING)}>
                  Media Management
                </SubMenuItem>
              </Styled.RouterLink>
            </SubMenu>
            <SubMenu title="Games" iconLeft={IconGamepad} {...getSubMenuProps(SUBMENUS.GAMES)}>
              <Styled.RouterLink to={routes.PROVIDERS}>
                <SubMenuItem icon={IconProvider} {...getSubMenuItemsProps(SUBMENUS.GAMES)}>
                  Providers
                </SubMenuItem>
              </Styled.RouterLink>
              <Styled.RouterLink to={routes.GAMES_LIST}>
                <SubMenuItem icon={IconList} {...getSubMenuItemsProps(SUBMENUS.GAMES)}>
                  List
                </SubMenuItem>
              </Styled.RouterLink>
              <Styled.RouterLink to={routes.GAMES_CATEGORIES}>
                <SubMenuItem icon={IconCategory} {...getSubMenuItemsProps(SUBMENUS.GAMES)}>
                  Categories
                </SubMenuItem>
              </Styled.RouterLink>
            </SubMenu>

            <SubMenu title="Finance" iconLeft={IconAbacus} {...getSubMenuProps(SUBMENUS.FINANCE)}>
              <Styled.RouterLink to={routes.PAYMENTS}>
                <SubMenuItem icon={IconPayment} {...getSubMenuItemsProps(SUBMENUS.FINANCE)}>
                  Payment Mandates
                </SubMenuItem>
              </Styled.RouterLink>

              <Styled.RouterLink to={routes.WITHDRAWALS}>
                <SubMenuItem icon={IconReceipt} {...getSubMenuItemsProps(SUBMENUS.FINANCE)}>
                  Withdrawal Demands
                </SubMenuItem>
              </Styled.RouterLink>
            </SubMenu>
          </GroupMenu>
        )}

        {!isRestricted && (
          <GroupMenu title="SETTINGS" hide={isCollapsed}>
            <Styled.RouterLink to={routes.GAMES_TAGS}>
              <MenuItem iconLeft={IconTags} isCollapsed={isCollapsed}>
                Tags
              </MenuItem>
            </Styled.RouterLink>
            <Styled.RouterLink to={routes.CASINO_SETTINGS_FOOTER}>
              <MenuItem iconLeft={IconSettings} isCollapsed={isCollapsed}>
                Settings
              </MenuItem>
            </Styled.RouterLink>
          </GroupMenu>
        )}

        <Styled.VoidSpace />
        <MenuItem iconLeft={IconLogout} onClick={onClickLogout} isCollapsed={isCollapsed}>
          Logout
        </MenuItem>
      </Styled.MenuContainer>
      <Styled.BodyContainer>{children}</Styled.BodyContainer>
    </Styled.PageContainer>
  );
};

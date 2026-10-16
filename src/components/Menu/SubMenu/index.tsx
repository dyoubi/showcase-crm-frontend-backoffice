import React from 'react';

import { MenuItemProps } from '../MenuItem';
import { MenuItem } from './styles';

interface SubMenuProps extends MenuItemProps {
  title?: string;
  onClick?: () => void;
  ['data-testid']?: string;
}

export const SubMenu = ({
  title,
  children,
  isCollapsed,
  iconLeft,
  iconLeftProps,
  iconRight,
  iconRightProps,
  onClick,
  'data-testid': dataTestId,
}: SubMenuProps) => (
  <div>
    <MenuItem
      onClick={onClick}
      isCollapsed={isCollapsed}
      iconLeft={iconLeft}
      iconLeftProps={iconLeftProps}
      iconRight={iconRight}
      iconRightProps={iconRightProps}
      data-testid={dataTestId}
    >
      {title}
    </MenuItem>
    {children}
  </div>
);

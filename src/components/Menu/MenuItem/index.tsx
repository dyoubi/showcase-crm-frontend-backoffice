import React from 'react';

import { IconFC, IconProps } from '@/shared/Icons/types';
import * as Styled from './styles';

export interface MenuItemProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  onClick?: () => void;
  iconLeft?: IconFC;
  iconLeftProps?: IconProps;
  iconRight?: IconFC;
  iconRightProps?: IconProps;
  className?: string;
  isClickable?: boolean;
  ['data-testid']?: string;
}

export const MenuItem = ({
  children,
  isCollapsed,
  onClick,
  isClickable = false,
  iconLeft: IconLeftComponent,
  iconLeftProps = {},
  iconRight: IconRightComponent,
  iconRightProps = {},
  className,
  'data-testid': dataTestId,
}: MenuItemProps) => {
  return (
    <Styled.Container
      className={className}
      onClick={onClick}
      isClickable={!!onClick || isClickable}
      data-testid={dataTestId}
    >
      {IconLeftComponent && (
        <Styled.Icon>
          <IconLeftComponent size="l" color="currentColor" {...iconLeftProps} ref={null} />
        </Styled.Icon>
      )}

      <Styled.ItemContent isCollapsed={isCollapsed}>
        <Styled.ItemText>{children}</Styled.ItemText>
      </Styled.ItemContent>

      {!isCollapsed && IconRightComponent && (
        <Styled.Icon>
          <IconRightComponent size="l" color="currentColor" {...iconRightProps} ref={null} />
        </Styled.Icon>
      )}
    </Styled.Container>
  );
};

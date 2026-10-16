import React from 'react';
import { useTheme } from '@emotion/react';

import { IconProps, IconFC } from '@/shared/Icons/types';

import * as Styled from './styles';

interface SubMenuItemProps {
  icon: IconFC;
  children: React.ReactNode;
  iconProps?: IconProps;
  isCollapsed: boolean;
  onClick?: () => void;
  ['data-testid']?: string;
}

export const SubMenuItem = ({
  children,
  icon: Icon,
  iconProps,
  isCollapsed,
  onClick,
  'data-testid': dataTestId,
}: SubMenuItemProps) => {
  const theme = useTheme();
  return (
    <Styled.Container isCollapsed={isCollapsed} onClick={onClick} data-testid={dataTestId}>
      {Icon && (
        <Styled.Item>
          <Icon size={24} {...iconProps} ref={null} />
        </Styled.Item>
      )}
      <Styled.Item marginLeft={theme.spaces.margin.xs}>
        <Styled.Text>{children}</Styled.Text>
      </Styled.Item>
    </Styled.Container>
  );
};

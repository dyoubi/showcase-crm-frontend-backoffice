import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

const TABS_HEIGHT = 48;

export const Container = styled.div({ width: '100%' });

export const TabsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const getTabVariantsStyles = (theme: Theme, status: 'ACTIVE' | 'INACTIVE') =>
  ({
    ACTIVE: {
      border: `1px solid ${theme.typography.colors.primary}`,
      borderBottomColor: 'transparent',
    },
    INACTIVE: {
      borderBottom: `1px solid ${theme.typography.colors.primary}`,
    },
  }[status]);

export const Tab = styled.div<{ status: 'ACTIVE' | 'INACTIVE' }>(({ theme, status }) => ({
  height: TABS_HEIGHT,
  color: theme.typography.colors.primary,
  padding: `0 ${theme.spaces.padding.m}`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxSizing: 'border-box',
  ...getTabVariantsStyles(theme, status),
}));

export const Title = styled.span<{ hasIcon: boolean }>(({ theme, hasIcon }) => ({
  display: 'block',
  marginLeft: hasIcon ? theme.spaces.margin.xxs : 0,
}));

export const VoidTab = styled(Tab)({ flex: 1 });

export const Content = styled.div(({ theme }) => ({ padding: theme.spaces.padding.s }));

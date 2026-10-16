import styled from '@emotion/styled';

import { Flex } from '@/shared/Flex';

export const Container = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spaces.margin.m,
}));

export const CollapseContent = styled.div<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: '100%',
  display: isCollapsed ? 'none' : 'block',
  height: isCollapsed ? 0 : undefined,
}));

export const CollapseHeader = styled.button(() => ({
  margin: 0,
  padding: 0,
  border: 0,
  backgroundColor: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
}));

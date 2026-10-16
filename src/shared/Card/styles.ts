import styled from '@emotion/styled';

import { CardProps } from './types';

export const Card = styled.div<CardProps>(({ status = 'base', theme, width, }) => ({
  overflow: 'visible',
  position: 'relative',
  border: 0,
  borderRadius: 10,
  boxShadow: '0 4px 20px 1px rgb(0 0 0 / 6%), 0 1px 4px rgb(0 0 0 / 8%)',
  padding: theme.spaces.padding.m,
  backgroundColor: (status === 'base') ? theme.components.containers.backgroundColor : theme.colors[status].main,
  color: (status === 'base') ? 'inherit' : theme.colors[status].contrastText,
  width,
}));

export const TitleContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: theme.spaces.margin.m,
}));

// TODO @HEADING: Standardize Heading component
export const Title = styled.h4(({ theme }) => ({
  fontSize: theme.typography.heading.h4.fontSize,
  padding: 0,
  margin: 0,
  marginLeft: theme.spaces.margin.xs,
}));

export const ContentContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const SideContent = styled.div({
  flex: 1,
  padding: '0 10px',
});

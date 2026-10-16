import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const Link = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.colors.primary.main,
  borderBottom: '1px solid transparent',
  '&:hover': {
    borderBottom: '1px solid currentColor',
  }
}));

export const Arrow = styled.span(({ theme }) => ({
  marginRight: theme.spaces.margin.xxs,
  marginLeft: theme.spaces.margin.xxs,
}));

export const LastBreadcrumb = styled.span(({ theme }) => ({
  borderBottom: '1px solid transparent',
  color: theme.typography.colors.primary,
}));

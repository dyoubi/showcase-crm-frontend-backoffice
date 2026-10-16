import styled from '@emotion/styled';

export const GameInfoLine = styled.div(({ theme }) => ({
  color: theme.typography.colors.secondary,
  marginBottom: theme.spaces.margin.m,
}));

export const Title = styled.div(({ theme }) => ({
  marginBottom: theme.spaces.margin.xxs,
  color: theme.typography.colors.primary,
  fontWeight: 'bold',
}));

export const EndBalance = styled.span(({ theme }) => ({
  color: theme.colors.success.main,
}));

import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const Container = styled.ul<{ isDarkMode?: boolean }>(({ isDarkMode, theme }) => ({
  width: '100%',
  listStyle: 'none',
  margin: 0,
  padding: 0,

  'li:nth-of-type(even)': {
    background: (isDarkMode) ? theme.components.table.zebra.dark : theme.components.table.zebra.light,
    borderRadius: 6,
  },

  'li:hover': {
    backgroundColor: (isDarkMode) ? theme.components.table.highlight.dark : theme.components.table.highlight.light,
    borderRadius: 6,
  },

  'span': {
    color: (isDarkMode) ? theme.colors.secondary.contrastText : 'inherit',
  }
}));

export const BetLine = styled(RouterLink, {
  shouldForwardProp: (propName: string) =>  !propName.startsWith('$'),
})<{
  $isDarkMode?: boolean,
  $isHover?: boolean
}>(({
  $isDarkMode = false,
  $isHover = false,
  theme,
}) => {
  const hoveredBackgroundColor =  ($isDarkMode) ? theme.components.table.highlight.dark : theme.components.table.highlight.light;

  return {
    backgroundColor: ($isHover) ? hoveredBackgroundColor : 'inherit',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 14,
    borderRadius: 6,
    padding: `${theme.spaces.margin.s} ${theme.spaces.margin.xxs}`,
    color: ($isDarkMode) ? theme.colors.primary.contrastText : 'inherit',
    textDecoration: 'none',
  };
});

export const GameName = styled.span(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.typography.colors.primary,
}));

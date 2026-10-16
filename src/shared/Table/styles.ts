import styled from '@emotion/styled';

import * as t from './types';

export const Container = styled.div({
  overflowX: 'scroll',
});

export const StyledTable = styled.table<t.TablePropsType>(({
  theme,
  fullWidth = true,
  innerBorder = false,
  isDarkMode = true,
  size = 'xxs',
  zebra = false, }) => ({
  width: fullWidth ? '100%' : undefined,
  backgroundColor: 'transparent',
  textAlign: 'center',
  borderSpacing: 0,
  boxSizing: 'border-box',

  'td, th': {
    padding: theme.spaces.padding[size],
    borderBottom: `1px solid ${(isDarkMode) ? theme.colors.border.contrastText : theme.colors.border.main}`,
  },

  'tbody tr:last-child td, tbody tr:last-child th': {
    borderBottom: 0,
  },

  'thead th': {
    borderBottom: `2px solid ${(isDarkMode) ? theme.colors.border.contrastText : theme.colors.border.main}`,
  },

  'tbody th': {
    borderRight: `2px solid ${(isDarkMode) ? theme.colors.border.contrastText : theme.colors.border.main}`,
  },

  'th & > *': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  'tbody tr:hover td, tbody tr:hover th': {
  background: (isDarkMode) ? theme.components.table.highlight.dark : theme.components.table.highlight.light,
    color: (isDarkMode) ? theme.colors.secondary.contrastText : 'inherit',
  },

  ...((innerBorder) ? {
    'tbody tr td': {
      borderLeft: `1px solid ${(isDarkMode) ? theme.colors.border.contrastText : theme.colors.border.main}`,
    },

    'tbody tr > td:nth-of-type(1)': {
      borderLeft: 0,
    },
  } : {}),

  ...((zebra) ? {
    '& tbody tr:nth-of-type(even)': {
      color: (isDarkMode) ? theme.colors.secondary.contrastText : 'inherit',
      background: (isDarkMode) ? theme.components.table.zebra.dark : theme.components.table.zebra.light,
    },
  } : {}),
}));

import styled from '@emotion/styled';

export const StyledRoot = styled.ul<{ fullHeight: boolean }>(({
  theme,
  fullHeight
}) => ({
  listStyle: 'none',
  padding: 0,
  marginTop: 0,
  marginBottom: theme.spaces.margin.m,
  maxHeight: (fullHeight) ? '100%' : '15em',
  maxWidth: '50em',
  overflowY: 'scroll',

  h3: {
    textTransform: 'capitalize',
  },

  'li:last-child': {
    marginBottom: 0,
  },
}));

export const StyledContainer = styled.li(({
  theme,
}) => ({
  marginBottom: theme.spaces.margin.m,

  a: {
    display: 'flex',
  },

  svg: {
    marginRight: theme.spaces.margin.m,
  },

  h3: {
    marginBottom: theme.spaces.margin.m,
  },

  p: {
    fontWeight: 'normal',
  },

  'h3, p, span': {
    margin: 0,
  },
}));

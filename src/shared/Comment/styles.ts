import styled from "@emotion/styled";

import * as t from './types';

export const StyledRoot = styled.li<Omit<t.CommentPropsType, 'author' | 'comment' | 'date'>>(({
  align = 'left',
  isSystem = false,
  theme,
}) => ({
  marginBottom: theme.spaces.margin.s,
  borderRadius: (isSystem) ? 12 : 0,
  backgroundColor: (isSystem) ? theme.colors.secondary.main : theme.components.containers.backgroundColor,
  color: (isSystem) ? theme.colors.secondary.contrastText : 'inherit',
  overflow: 'visible',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: (align === 'left') ?  'flex-start' :  'flex-end',

  div: {
    maxWidth: '80%',
  },

  p: {
    display: 'inline',
    margin: 0,
    justifyContent: (align === 'left') ? 'flex-end' : 'flex-start',
  },
}));

export const StyledContent = styled.div(({ theme }) => ({
  padding: `${theme.spaces.padding.s} ${theme.spaces.padding.m}`,
  borderRadius: 12,
}));

export const StyledDate = styled.p<{ align?: string }>(({
  align = 'left',
}) => ({
  display: 'block',
  width: '100%',
  opacity: 0.8,
  textAlign: (align === 'left') ? 'start' : 'end',
}))

export const StyledAuthor = styled.p<{ align?: t.CommentPropsType['align'], isSystem?: t.CommentPropsType['isSystem'], color?: t.CommentPropsType['color'] }>(({
  theme,
  align = 'left',
  color,
  isSystem = false,
}) => ({
  color: (isSystem || !color) ? 'inherit' : theme.colors[color].main,
  fontWeight: 'bold',
  textAlign: (align === 'left') ? 'start' : 'end',
}))

export const StyledHeader = styled.div(({
  theme,
}) => ({
  'p:first-of-type': {
    marginRight: theme.spaces.margin.xxs,
  }
}))

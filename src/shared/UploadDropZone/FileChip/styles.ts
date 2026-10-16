import styled from '@emotion/styled';

import { FileStatus } from '../types';
import * as c from './constants';

export const Container = styled.div<{ variant: FileStatus }>(({ theme, variant }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 26,
  color: theme.colors[variant].main,
  border: `2px solid currentColor`,
  padding: `0 ${theme.spaces.margin.xxs}`,
  marginBottom: theme.spaces.margin.m,
  marginRight: theme.spaces.margin.xs,
  borderRadius: 7,
  opacity: 0.7,
  cursor: 'pointer',

  '&:hover': {
    opacity: 1,
    borderColor: theme.colors.primary.main,
  },

  // when we hover the container, we display the remove icon
  [`.${c.CLASSNAMES.ICON_REMOVE}`]: {
    display: 'none',
  },

  // when we hover the container, we display the remove icon
  [`&:hover .${c.CLASSNAMES.ICON_REMOVE}`]: {
    display: 'initial',
  },

  // when we hover the container, we hide the status icon
  [`&:hover .${c.CLASSNAMES.ICON_STATUS}`]: {
    display: 'none',
  },
}));

export const FileName = styled.span({
  fontSize: 12,
});

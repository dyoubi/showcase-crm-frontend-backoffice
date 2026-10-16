import styled from '@emotion/styled';
import { Colors } from '@emotion/react';

import { Card as CardRaw } from '../Card';
import * as c from './constants';

export const Card = styled(CardRaw)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: 250,
  height: 80,
  minWidth: 'unset',
  padding: 0,
  overflow: 'hidden',
  [`.${c.CLASSNAMES.KPI_ICON}`]: {
    flexShrink: 0,
    marginLeft: theme.spaces.margin.m,
  },
}));

export const Content = styled.div(({ theme }) => ({
  marginLeft: theme.spaces.margin.xs,
}));

export const KPIName = styled.span(({ theme }) => ({
  fontSize: 15,
  display: 'block',
  color: theme.typography.colors.primary,
}));

export const KPIValue = styled.span<{ color: Colors }>(({ theme, color }) => ({
  display: 'block',
  color: theme.colors[color].main,
  fontSize: 25,
}));

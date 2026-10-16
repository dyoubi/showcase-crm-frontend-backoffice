import styled from '@emotion/styled';

import { CardKPI as CardKPIRaw } from '@/shared/CardKPI';

export const KPIsContainer = styled.div(({ theme }) => ({
  marginBottom: theme.spaces.margin.l,
}));

export const CardKPI = styled(CardKPIRaw)(({ theme }) => ({
  marginBottom: theme.spaces.margin.s,
  marginRight: theme.spaces.margin.m,
}));

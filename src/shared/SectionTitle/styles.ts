import styled from '@emotion/styled';
import { convertHexColorToRgba } from '@/utils/color';

export const Container = styled.div(({ theme }) => ({
  marginBottom: theme.spaces.margin.l,
}));

export const Divider = styled.div(({ theme }) => ({
  width: '100%',
  height: 1,
  backgroundColor: convertHexColorToRgba(theme.typography.colors.secondary, 0.18),
}));

import styled from '@emotion/styled';

import { colors } from '@/theme/light/colors';

import * as t from './types';

export const StyledPill = styled.span<t.PillPropsType>(({ color = 'primary' }) => ({
  borderRadius: '9999px',
  fontWeight: '400',
  textTransform: 'capitalize',
  padding: '0.5rem 1rem',
  color: colors[color].contrastText,
  backgroundColor: colors[color].main,
}));

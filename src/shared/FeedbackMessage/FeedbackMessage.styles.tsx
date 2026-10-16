import styled from '@emotion/styled';
import { Colors } from '@emotion/react';

export const StyledFeedbackMessage = styled.div<{ color?: string | Colors }>(
  ({ theme, color = 'primary' }) => ({
    ...theme.typography.caption,
    fontWeight: 300,
    marginTop: theme.spaces.margin.xxs,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: theme.colors[color as Colors] ? theme.colors[color as Colors].main : color,
  }),
);

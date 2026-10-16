import styled from '@emotion/styled';

export const EndBalance = styled.span<{ color: 'danger' | 'success' }>(({ theme, color }) => ({
    color: theme.colors[color].main,
  }));
  
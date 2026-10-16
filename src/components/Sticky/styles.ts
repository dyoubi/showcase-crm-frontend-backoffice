import styled from '@emotion/styled';

export const Container = styled.div<{ top?: number }>(({ theme, top }) => ({
  position: 'sticky',
  top: top || theme.spaces.margin.l,
}));

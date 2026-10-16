import styled from '@emotion/styled';

export const Container = styled.div(({ theme }) => ({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  opacity: '88%',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 900,
  color: theme.typography.colors.primary,
  backgroundColor: theme.components.containers.backgroundColor,
}));

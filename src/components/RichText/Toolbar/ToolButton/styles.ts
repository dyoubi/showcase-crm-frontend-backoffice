import styled from '@emotion/styled';

export const Button = styled.button<{ isActive?: boolean }>(({ theme, isActive }) => ({
  height: 48,
  width: 52,
  border: 'none',
  borderRight: '1px solid #aaa',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: (isActive && theme.colors.success.main) || undefined,
}));

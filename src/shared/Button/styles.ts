import { Link } from 'react-router-dom';
import { Theme } from '@emotion/react';
import styled, { CSSObject } from '@emotion/styled';

import { convertHexColorToRgba } from '@/utils/color';

import * as t from './types';

const getBaseButtonStyles = <T extends t.ButtonPropsType | t.LinkButtonType>({
  color = 'primary',
  disabled,
  size,
  width,
}: T, theme: Theme): CSSObject => ({
  ...theme.typography.button,
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  border: `1px solid ${theme.colors[color].main}`,
  borderRadius: 6,
  backgroundColor: theme.colors[color].main,
  color: theme.colors[color].contrastText,
  opacity: disabled ? 0.5 : 1,
  padding: size === 'xl' ? '20px 93px' : '16px',
  fontSize: 14,
  cursor: disabled ? 'not-allowed' : 'pointer',
  pointerEvents: disabled ? 'none' : 'auto',
  height: theme.sizes.button.height,
  width,

  '&:hover': {
    backgroundColor: convertHexColorToRgba(theme.colors[color].main, 0.3),
    borderColor: convertHexColorToRgba(theme.colors[color].main, 0.3),
  },
})

export const StyledButton = styled.button<t.ButtonPropsType>(({ theme, ...props }) => ({
  ...getBaseButtonStyles<t.ButtonPropsType>(props, theme),
}));

export const StyledLink = styled(Link)<t.LinkButtonType>(({ theme, ...props }) => ({
  ...getBaseButtonStyles<t.LinkButtonType>(props, theme),

  textAlign: 'center',
}));

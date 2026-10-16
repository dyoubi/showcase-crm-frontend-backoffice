import styled from '@emotion/styled';

import { convertHexColorToRgba, hexRgb, rgbLuminance } from '@/utils/color';
import { Colors, Theme } from '@emotion/react';
import * as t from './types';

export const Container = styled.span<t.BadgePropsType>(({ theme, color = 'primary' }) => ({
  display: 'inline-block',
  padding: `6px 12px`,
  borderRadius: 3,
  backgroundColor: convertHexColorToRgba(
    theme.colors?.[color as Colors]?.main || color || '#000000',
    0.9,
  ),
  color: getContrastColor(color ?? 'primary', theme),
}));

export const getContrastColor = (color: string, theme: Theme) => {
  if (color[0] !== '#') {
    return theme?.colors?.[color as Colors]?.contrastText;
  }

  const { red, green, blue } = hexRgb(color);

  const luminance = rgbLuminance({ red, green, blue });

  if (luminance < 128) {
    return theme?.colors?.primary?.contrastText;
  }

  return theme?.colors?.tertiary?.main;
};

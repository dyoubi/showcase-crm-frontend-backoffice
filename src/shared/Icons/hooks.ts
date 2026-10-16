import { useTheme } from '@emotion/react';

import * as t from './types';
import { ICON_STROKE_WIDTH } from './constants';

export const useIconColor = (color: t.IconProps['color'] = 'currentColor'): string => {
  const theme = useTheme();
  const iconColor = color as t.ColorVariant;

  // TODO: when theme colors refatoring is done,update theses values
  const colorsVariant = {
    primary: theme.colors.primary.main,
    secondary: theme.colors.secondary.main,
    tertiary: theme.colors.tertiary.main,
    success: theme.colors.success.main,
    warning: theme.colors.warning.main,
    danger: theme.colors.danger.main,
  } as const;

  if (!colorsVariant?.[iconColor]) {
    return iconColor;
  }

  return colorsVariant?.[iconColor];
};

export const useIconSize = (size: t.IconProps['size']) => {
  const {
    sizes: { icons },
  } = useTheme();

  if (!size) {
    return icons.l;
  }

  if (typeof size === 'number' || !icons?.[size]) {
    return size;
  }

  return icons[size];
};

export const useIconStrokeWidth = (size: t.IconProps['size']) => {
  if (!size) {
    return ICON_STROKE_WIDTH.m;
  }

  if (typeof size === 'number' || !ICON_STROKE_WIDTH?.[size]) {
    return ICON_STROKE_WIDTH.m;
  }

  return ICON_STROKE_WIDTH[size];
};

import styled from '@emotion/styled';

import { convertHexColorToRgba } from '@/utils/color';

import { Button } from '../Button';

export const StyledButton = styled(Button)<{ isDarkMode?: boolean }>(({ theme, isDarkMode }) => ({
  display: 'flex',
  border:  (isDarkMode) ? `1px solid ${theme.colors.secondary.contrastText}` : `1px solid ${theme.colors.primary.main}`,
  backgroundColor: 'transparent',
  padding: theme.spaces.padding.xxs,
  height: 'auto',

  '&:hover': {
      backgroundColor: convertHexColorToRgba((isDarkMode) ? theme.colors.secondary.contrastText : theme.colors.primary.main, 0.3),
      borderColor: convertHexColorToRgba((isDarkMode) ? theme.colors.secondary.contrastText : theme.colors.primary.main, 0.3),
    },

  ' svg': {
    stroke: (isDarkMode) ? theme.colors.secondary.contrastText : theme.colors.primary.main,
  },
}));

import styled from '@emotion/styled';

export const Container = styled.div<{ isSelected: boolean; isFocused: boolean }>(
  ({ isSelected, theme, isFocused }) => {
    const commonStyle = {
      minHeight: theme.sizes.input.height,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spaces.padding.l,
      color: (isFocused && theme.colors.primary.contrastText) || undefined,
      backgroundColor: (isFocused && theme.colors.primary.main) || undefined,
    };

    if (isSelected) {
      return {
        ...commonStyle,
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.primary.contrastText,
      };
    }
    return {
      ...commonStyle,
      '&:hover': {
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.primary.contrastText,
      },
    };
  },
);

import { Theme } from '@emotion/react';
import { css } from '@emotion/css';

export const fontsFaces = css`
  @font-face {
    font-family: 'Space Grotesk';
    src: url('/assets/fonts/SpaceGrotesk-Regular.ttf');
    font-display: swap;
  }

  @font-face {
    font-family: 'Space Grotesk';
    src: url('/assets/fonts/SpaceGrotesk-Light.ttf');
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: 'Space Grotesk';
    src: url('/assets/fonts/SpaceGrotesk-Medium.ttf');
    font-weight: 500;
    font-display: swap;
  }

  @font-face {
    font-family: 'Space Grotesk';
    src: url('/assets/fonts/SpaceGrotesk-Bold.ttf');
    font-weight: 700;
    font-display: swap;
  }
`;

export const globalStyles = (theme: Theme) => ({
  'body, html, #root': {
    ...theme.components.body,
    fontSize: 14,
    margin: 0,
    padding: 0,
    fontFamily: theme.typography.fontFamily,
    color: theme.typography.colors.primary,
    width: '100%',
    height: '100%',
  },

  'input,textarea, input::-webkit-input-placeholder, button': {
    fontFamily: theme.typography.fontFamily,
  },

  '::-webkit-scrollbar-thumb': {
    background: theme.colors.secondary.main,
    borderRadius: 30,
  },

  '::-webkit-scrollbar': {
    width: 8,
    height: 8,
    backgroundColor: 'transparent',
  },
  svg: {
    // we didnt want than the svg icon is resized if the container is too small
    flexShrink: 0,
  },
});

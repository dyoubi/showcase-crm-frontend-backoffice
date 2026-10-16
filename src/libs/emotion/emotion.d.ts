import '@emotion/react';

declare module '@emotion/react' {
  export type Sizes = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

  interface Palette {
    main: string;
    contrastText: string;
  }

  interface TextProperties {
    fontSize?: string | number;
    fontWeight?: string | number;
    lineHeight?: string | number;
  }

  export interface Theme {
    typography: {
      fontFamily: string;
      colors: {
        primary: string;
        secondary: string;
      };
      heading: Record<'h1' | 'h2' | 'h3' | 'h4', TextProperties>;
      caption: TextProperties;
      headline: TextProperties;
      subheadline: TextProperties;
      button: TextProperties;
    };
    colors: {
      primary: Palette;
      secondary: Palette;
      tertiary: Palette;
      success: Palette;
      warning: Palette;
      danger: Palette;
      border: Palette;
    };
    sizes: {
      icons: Record<Sizes, number | string>;
      input: {
        height: number | string;
      };
      select: {
        height: number | string;
      };
      button: {
        height: number | string;
      };
    };
    spaces: {
      padding: Record<Sizes, string>;
      margin: Record<Sizes, string>;
    };
    components: {
      containers: { backgroundColor: string };
      body: { backgroundColor: string };
      formGroup: {
        border: {
          default: string;
          disabled: string;
        };
        header: string;
        title: string;
        label: string;
        value: string;
        input: { height: number; width: number };
      };
      table: {
        highlight: { light: string, dark: string };
        zebra: { light: string, dark: string };
      };
    };
  }
  export type Colors = keyof Theme['colors'];
}

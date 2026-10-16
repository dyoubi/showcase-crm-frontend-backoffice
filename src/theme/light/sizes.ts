const INPUT_SIZES = 42;

export const sizes = {
  icons: {
    // TODO check with ui design team if all these values are correctly set
    xxs: 9,
    xs: 12,
    s: 14,
    m: 18,
    l: 28,
    xl: 48,
    xxl: 96,
  },
  input: {
    height: INPUT_SIZES,
  },
  select: {
    height: INPUT_SIZES,
  },
  button: {
    height: INPUT_SIZES,
  },
} as const;

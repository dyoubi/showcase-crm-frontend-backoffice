import { Sizes } from "@emotion/react";

export const iconStorySettings = {
  argTypes: {
    color: {
      control: 'color',
    },
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    opacity: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  },
  args: {
    color: 'primary',
  },
};

export const ICON_STROKE_WIDTH: Record<Sizes, number> = {
  xxs: 0.5,
  xs: 0.75,
  s: 1,
  m: 1.25,
  l: 1.50,
  xl: 1.75,
  xxl: 2,
};

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconShoppingCart } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconShoppingCart',
  component: IconShoppingCart,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconShoppingCart {...args} />
);

export const Default = Template.bind({});

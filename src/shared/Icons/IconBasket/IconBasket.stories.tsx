import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconBasket } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconBasket',
  component: IconBasket,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconBasket {...args} />
);

export const Default = Template.bind({});

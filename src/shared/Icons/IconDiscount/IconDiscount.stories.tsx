import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconDiscount } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconDiscount',
  component: IconDiscount,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconDiscount {...args} />
);

export const Default = Template.bind({});

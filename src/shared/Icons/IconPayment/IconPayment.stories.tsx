import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconPayment } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconPayment',
  component: IconPayment,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconPayment {...args} />
);

export const Default = Template.bind({});

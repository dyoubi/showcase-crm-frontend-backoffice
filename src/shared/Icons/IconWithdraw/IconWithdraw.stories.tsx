import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconWithdraw } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconWithdraw',
  component: IconWithdraw,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconWithdraw {...args} />
);

export const Default = Template.bind({});

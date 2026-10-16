import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconMobile } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconMobile',
  component: IconMobile,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconMobile {...args} />
);

export const Default = Template.bind({});

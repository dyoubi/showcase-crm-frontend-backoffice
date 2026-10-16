import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconProps } from '../types';
import { iconStorySettings } from '../constants';

import { IconMedia } from '.';

export default {
  title: 'Icons/IconMedia',
  component: IconMedia,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  <IconMedia {...args} ref={undefined} />
);

export const Default = Template.bind({});

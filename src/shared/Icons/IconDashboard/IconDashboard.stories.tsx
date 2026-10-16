import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconDashboard } from './IconDashboard';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconDashboard',
  component: IconDashboard,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconDashboard {...args} />
);

export const Default = Template.bind({});

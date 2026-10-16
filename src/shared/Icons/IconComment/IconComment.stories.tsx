import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconComment } from './IconComment';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconComment',
  component: IconComment,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconComment {...args} />
);

export const Default = Template.bind({});

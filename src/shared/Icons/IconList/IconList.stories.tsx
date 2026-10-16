import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconList } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconList',
  component: IconList,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconList {...args} />
);

export const Default = Template.bind({});

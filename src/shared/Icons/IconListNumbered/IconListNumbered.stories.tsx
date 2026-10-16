import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconListNumbered } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconListNumbered',
  component: IconListNumbered,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconListNumbered {...args} />
);

export const Default = Template.bind({});

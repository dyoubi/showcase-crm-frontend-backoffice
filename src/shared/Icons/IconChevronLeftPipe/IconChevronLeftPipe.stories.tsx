import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconChevronLeftPipe } from './IconChevronLeftPipe';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconChevronsLeft',
  component: IconChevronLeftPipe,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconChevronLeftPipe {...args} />
);

export const Default = Template.bind({});

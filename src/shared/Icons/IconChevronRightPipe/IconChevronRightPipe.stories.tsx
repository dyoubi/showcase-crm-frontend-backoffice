import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconChevronRightPipe } from './IconChevronRightPipe';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconChevronsLeft',
  component: IconChevronRightPipe,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconChevronRightPipe {...args} />
);

export const Default = Template.bind({});

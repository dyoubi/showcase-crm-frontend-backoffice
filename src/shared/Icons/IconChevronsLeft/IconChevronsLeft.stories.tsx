import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconChevronsLeft } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconChevronsLeft',
  component: IconChevronsLeft,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconChevronsLeft {...args} />
);

export const Default = Template.bind({});

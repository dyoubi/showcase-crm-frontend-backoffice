import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconChevronsRight } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconChevronsRight',
  component: IconChevronsRight,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconChevronsRight {...args} />
);

export const Default = Template.bind({});

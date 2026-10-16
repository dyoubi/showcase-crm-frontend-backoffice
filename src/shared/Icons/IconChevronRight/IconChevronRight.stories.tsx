import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconChevronRight } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconChevronRight',
  component: IconChevronRight,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconChevronRight {...args} />
);

export const Default = Template.bind({});

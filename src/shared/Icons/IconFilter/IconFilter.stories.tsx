import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconFilter } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconFilter',
  component: IconFilter,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconFilter {...args} />
);

export const Default = Template.bind({});

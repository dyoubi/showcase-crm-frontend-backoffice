import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconCash } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconCash',
  component: IconCash,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconCash {...args} />
);

export const Default = Template.bind({});

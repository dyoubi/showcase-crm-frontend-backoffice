import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconAlignCenter } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconAlignCenter',
  component: IconAlignCenter,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconAlignCenter {...args} />
);

export const Default = Template.bind({});

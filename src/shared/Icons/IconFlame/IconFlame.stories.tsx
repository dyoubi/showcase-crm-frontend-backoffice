import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconFlame } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconFlame',
  component: IconFlame,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconFlame {...args} />
);

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconShuffle } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconShuffle',
  component: IconShuffle,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconShuffle {...args} />
);

export const Default = Template.bind({});

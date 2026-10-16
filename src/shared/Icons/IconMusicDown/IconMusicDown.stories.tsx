import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconMusicDown } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconMusicDown',
  component: IconMusicDown,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconMusicDown {...args} />
);

export const Default = Template.bind({});

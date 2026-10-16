import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconMusicMute } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconMusicOff',
  component: IconMusicMute,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconMusicMute {...args} />
);

export const Default = Template.bind({});

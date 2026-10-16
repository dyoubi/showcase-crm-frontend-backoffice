import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconMusicMax } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconMusicMax',
  component: IconMusicMax,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconMusicMax {...args} />
);

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconPlayingCard2 } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconPlayingCard2',
  component: IconPlayingCard2,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconPlayingCard2 {...args} />
);

export const Default = Template.bind({});

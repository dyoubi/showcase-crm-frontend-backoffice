import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconPlayingCard1 } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconPlayingCard1',
  component: IconPlayingCard1,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconPlayingCard1 {...args} />
);

export const Default = Template.bind({});

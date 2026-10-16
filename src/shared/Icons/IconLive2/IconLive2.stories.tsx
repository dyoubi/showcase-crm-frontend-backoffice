import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconLive2 } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconLive2',
  component: IconLive2,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconLive2 {...args} />
);

export const Default = Template.bind({});

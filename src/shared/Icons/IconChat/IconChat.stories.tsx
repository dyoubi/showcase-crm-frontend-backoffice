import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconChat } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconChat',
  component: IconChat,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconChat {...args} />
);

export const Default = Template.bind({});

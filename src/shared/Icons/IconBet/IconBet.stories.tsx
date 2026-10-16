import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconBet } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconBet',
  component: IconBet,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconBet {...args} />
);

export const Default = Template.bind({});

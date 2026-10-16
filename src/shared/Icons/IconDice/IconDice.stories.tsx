import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconDice } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconDice',
  component: IconDice,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconDice {...args} />
);

export const Default = Template.bind({});

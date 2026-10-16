import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconMoon } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconMoon',
  component: IconMoon,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconMoon {...args} />
);

export const Default = Template.bind({});

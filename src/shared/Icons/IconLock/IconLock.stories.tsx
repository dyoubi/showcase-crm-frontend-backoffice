import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconLock } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconLock',
  component: IconLock,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconLock {...args} />
);

export const Default = Template.bind({});

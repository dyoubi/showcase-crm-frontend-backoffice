import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconShieldLock } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconShieldLock',
  component: IconShieldLock,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconShieldLock {...args} />
);

export const Default = Template.bind({});

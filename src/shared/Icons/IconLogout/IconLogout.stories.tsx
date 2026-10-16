import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconLogout } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconLogout',
  component: IconLogout,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconLogout {...args} />
);

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconWallet } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconWallet',
  component: IconWallet,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconWallet {...args} />
);

export const Default = Template.bind({});

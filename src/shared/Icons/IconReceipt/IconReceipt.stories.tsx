import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconReceipt } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconReceipt',
  component: IconReceipt,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconReceipt {...args} />
);

export const Default = Template.bind({});

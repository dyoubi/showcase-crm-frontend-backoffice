import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconDeposit } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconDeposit',
  component: IconDeposit,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconDeposit {...args} />
);

export const Default = Template.bind({});

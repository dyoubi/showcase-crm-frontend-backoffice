import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconEye } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconEye',
  component: IconEye,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconEye {...args} />
);

export const Default = Template.bind({});

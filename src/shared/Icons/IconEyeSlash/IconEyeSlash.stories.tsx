import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconEyeSlash } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconEyeSlash',
  component: IconEyeSlash,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconEyeSlash {...args} />
);

export const Default = Template.bind({});

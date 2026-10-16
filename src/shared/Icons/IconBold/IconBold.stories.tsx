import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconBold } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconBold',
  component: IconBold,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconBold {...args} />
);

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconMinus } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconMinus',
  component: IconMinus,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconMinus {...args} />
);

export const Default = Template.bind({});

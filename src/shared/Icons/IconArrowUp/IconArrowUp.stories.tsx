import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconArrowUp } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconArrowUp',
  component: IconArrowUp,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconArrowUp {...args} />
);

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconFolder } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconFolder',
  component: IconFolder,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconFolder {...args} />
);

export const Default = Template.bind({});

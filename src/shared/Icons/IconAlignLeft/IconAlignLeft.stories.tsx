import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconAlignLeft } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconAlignLeft',
  component: IconAlignLeft,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconAlignLeft {...args} />
);

export const Default = Template.bind({});

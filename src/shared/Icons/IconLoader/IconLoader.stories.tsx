import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconLoader } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconLoader',
  component: IconLoader,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconLoader {...args} />
);

export const Default = Template.bind({});

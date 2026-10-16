import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconRotate } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconRotate',
  component: IconRotate,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconRotate {...args} />
);

export const Default = Template.bind({});

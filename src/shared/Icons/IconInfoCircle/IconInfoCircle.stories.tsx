import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconInfoCircle } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconInfoCircle',
  component: IconInfoCircle,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconInfoCircle {...args} />
);

export const Default = Template.bind({});

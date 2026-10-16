import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconClose } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconClose',
  component: IconClose,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconClose {...args} />
);

export const Default = Template.bind({});

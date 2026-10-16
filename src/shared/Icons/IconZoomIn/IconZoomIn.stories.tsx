import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconZoomIn } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconZoomIn',
  component: IconZoomIn,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconZoomIn {...args} />
);

export const Default = Template.bind({});

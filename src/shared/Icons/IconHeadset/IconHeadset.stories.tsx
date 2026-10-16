import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconHeadset } from './IconHeadset';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconHeadset',
  component: IconHeadset,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconHeadset {...args} />
);

export const Default = Template.bind({});

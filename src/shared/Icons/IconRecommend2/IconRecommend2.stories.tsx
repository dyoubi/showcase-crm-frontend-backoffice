import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconRecommend2 } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconRecommend2',
  component: IconRecommend2,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconRecommend2 {...args} />
);

export const Default = Template.bind({});

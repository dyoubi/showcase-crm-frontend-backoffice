import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconRecommend } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconRecommend',
  component: IconRecommend,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconRecommend {...args} />
);

export const Default = Template.bind({});

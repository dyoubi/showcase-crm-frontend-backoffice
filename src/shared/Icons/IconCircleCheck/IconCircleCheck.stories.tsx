import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconCircleCheck } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconCircleCheck',
  component: IconCircleCheck,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconCircleCheck {...args} />
);

export const Default = Template.bind({});

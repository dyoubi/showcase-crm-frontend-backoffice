import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconArrowLeft } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconArrowLeft',
  component: IconArrowLeft,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconArrowLeft {...args} />
);

export const Default = Template.bind({});

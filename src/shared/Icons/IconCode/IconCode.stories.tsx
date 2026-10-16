import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconCode } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconCode',
  component: IconCode,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconCode {...args} />
);

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconBolt } from './IconBolt';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconBolt',
  component: IconBolt,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconBolt {...args} />
);

export const Default = Template.bind({});

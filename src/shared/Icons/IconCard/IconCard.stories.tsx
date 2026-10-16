import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconCard } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconCard',
  component: IconCard,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconCard {...args} />
);

export const Default = Template.bind({});

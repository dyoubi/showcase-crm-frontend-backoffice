import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconSpade } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconSpade',
  component: IconSpade,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconSpade {...args} />
);

export const Default = Template.bind({});

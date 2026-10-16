import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconAlignRight } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconAlignRight',
  component: IconAlignRight,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconAlignRight {...args} />
);

export const Default = Template.bind({});

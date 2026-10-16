import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconAlignJustify } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconAlignJustify',
  component: IconAlignJustify,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconAlignJustify {...args} />
);

export const Default = Template.bind({});

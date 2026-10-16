import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconPalette } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconPalette',
  component: IconPalette,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconPalette {...args} />
);

export const Default = Template.bind({});

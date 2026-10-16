import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconUnderline } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconUnderline',
  component: IconUnderline,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconUnderline {...args} />
);

export const Default = Template.bind({});

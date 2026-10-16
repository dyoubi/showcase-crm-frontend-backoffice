import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconTrash } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconTrash',
  component: IconTrash,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconTrash {...args} />
);

export const Default = Template.bind({});

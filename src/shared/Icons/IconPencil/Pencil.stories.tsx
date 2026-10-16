import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconPencil } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/Pencil',
  component: IconPencil,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconPencil {...args} />
);

export const Default = Template.bind({});

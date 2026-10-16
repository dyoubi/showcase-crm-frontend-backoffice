import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconNotif } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconNotif',
  component: IconNotif,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconNotif {...args} />
);

export const Default = Template.bind({});

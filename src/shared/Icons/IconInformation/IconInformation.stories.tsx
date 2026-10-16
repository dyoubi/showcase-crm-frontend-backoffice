import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconInformation } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconInformation',
  component: IconInformation,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconInformation {...args} />
);

export const Default = Template.bind({});

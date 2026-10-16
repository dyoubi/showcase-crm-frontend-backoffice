import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconLink } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconLink',
  component: IconLink,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconLink {...args} />
);

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconAnonymous } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconAnonymous',
  component: IconAnonymous,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconAnonymous {...args} />
);

export const Default = Template.bind({});

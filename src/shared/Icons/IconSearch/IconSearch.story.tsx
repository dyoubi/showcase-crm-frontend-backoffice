import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconSearch } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconSearch',
  component: IconSearch,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconSearch {...args} />
);

export const Default = Template.bind({});

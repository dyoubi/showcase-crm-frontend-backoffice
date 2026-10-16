import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconCalendar } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconCalendar',
  component: IconCalendar,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconCalendar {...args} />
);

export const Default = Template.bind({});

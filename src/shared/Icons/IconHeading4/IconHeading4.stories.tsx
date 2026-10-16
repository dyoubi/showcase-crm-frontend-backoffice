import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconHeading4 } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconHeading4',
  component: IconHeading4,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconHeading4 {...args} />
);

export const Default = Template.bind({});

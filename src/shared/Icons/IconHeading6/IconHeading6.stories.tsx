import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconHeading6 } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconHeading6',
  component: IconHeading6,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconHeading6 {...args} />
);

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconProps } from '../types';
import { iconStorySettings } from '../constants';

import { IconUpload } from '.';

export default {
  title: 'Icons/IconUpload',
  component: IconUpload,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  <IconUpload {...args} ref={undefined} />
);

export const Default = Template.bind({});

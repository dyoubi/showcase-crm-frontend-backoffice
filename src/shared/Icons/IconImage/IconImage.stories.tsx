import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconImage } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconImage',
  component: IconImage,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconImage {...args} />
);

export const Default = Template.bind({});

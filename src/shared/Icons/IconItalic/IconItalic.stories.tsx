import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconItalic } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconItalic',
  component: IconItalic,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconItalic {...args} />
);

export const Default = Template.bind({});

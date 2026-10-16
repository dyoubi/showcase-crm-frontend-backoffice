import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconAddPlus } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconAddPlus',
  component: IconAddPlus,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconAddPlus {...args} />
);

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconGamepad } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconGamepad',
  component: IconGamepad,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconGamepad {...args} />
);

export const Default = Template.bind({});

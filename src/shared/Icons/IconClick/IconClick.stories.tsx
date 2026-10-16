import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconClick } from './IconClick';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconClick',
  component: IconClick,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconClick {...args} />
);

export const Default = Template.bind({});

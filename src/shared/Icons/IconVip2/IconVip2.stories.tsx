import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconVip2 } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconVip2',
  component: IconVip2,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconVip2 {...args} />
);

export const Default = Template.bind({});

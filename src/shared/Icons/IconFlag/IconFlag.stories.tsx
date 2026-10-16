import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconFlag } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconFlag',
  component: IconFlag,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconFlag {...args} />
);

export const Default = Template.bind({});

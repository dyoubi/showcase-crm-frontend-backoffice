import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconDanger } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconDanger',
  component: IconDanger,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconDanger {...args} />
);

export const Default = Template.bind({});

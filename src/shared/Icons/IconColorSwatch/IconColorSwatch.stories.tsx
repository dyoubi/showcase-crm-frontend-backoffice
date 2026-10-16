import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconColorSwatch } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconColorSwatch',
  component: IconColorSwatch,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconColorSwatch {...args} />
);

export const Default = Template.bind({});

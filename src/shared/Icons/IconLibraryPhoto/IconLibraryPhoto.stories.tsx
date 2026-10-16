import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconLibraryPhoto } from '.';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconLibraryPhoto',
  component: IconLibraryPhoto,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconLibraryPhoto {...args} />
);

export const Default = Template.bind({});

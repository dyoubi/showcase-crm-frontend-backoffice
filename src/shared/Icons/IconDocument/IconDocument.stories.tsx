import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconDocument } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconDocument',
  component: IconDocument,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconDocument {...args} />
);

export const Default = Template.bind({});

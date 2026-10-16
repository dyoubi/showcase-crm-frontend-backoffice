import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconEthereum } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconEthereum',
  component: IconEthereum,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconEthereum {...args} />
);

export const Default = Template.bind({});

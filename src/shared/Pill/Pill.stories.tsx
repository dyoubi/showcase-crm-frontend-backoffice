import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';

import { Pill } from '.';

import { PillPropsType } from './types';

export default {
  title: 'Components/Pill',
  component: Pill,
  argTypes: {
    color: ArgsTypes.colors,
  },
} as Meta;

const Template: Story<PillPropsType> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Pill {...args} />
);

export const Default = Template.bind({});

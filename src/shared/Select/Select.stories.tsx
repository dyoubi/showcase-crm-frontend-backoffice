import React from 'react';
import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { Select } from '.';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    color: ArgsTypes.colors,
    label: ArgsTypes.text,
    caption: ArgsTypes.text,
  },
  args: {
    options,
    defaultValue: options[0],
  },
} as Meta;

const Template: Story = (args) => <Select {...args} />;

export const Default = Template.bind({});

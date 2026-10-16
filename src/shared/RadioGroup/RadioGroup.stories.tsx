import { Colors } from '@emotion/react';
import type { Meta, StoryFn as Story } from '@storybook/react';
import { FieldValues } from 'react-hook-form';
import { ArgsTypes } from '@/libs/storybook';

import { RadioGroupProps } from './types';
import { RadioGroup } from '.';

const colors: Array<Colors> = ['primary', 'secondary', 'tertiary', 'success', 'danger', 'warning'];
const options = [
  { label: 'Coffee ☕️', value: 'coffee', defaultChecked: true },
  { label: 'Mate 🧉', value: 'mate' },
  { label: 'Tea 🍵', value: 'tea' },

];

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    caption: ArgsTypes.text,
    color: {
      control: { type: 'select' },
      options: colors,
    },
    label: ArgsTypes.text,
    name: ArgsTypes.text,
  },
  args: {
    color: 'primary',
    label: 'Radio Group',
    name: 'radioTest',
    options,
  }
} as Meta;

const Template: Story<RadioGroupProps<FieldValues>> = (args) => <RadioGroup {...args} />;

export const Default = Template.bind({});

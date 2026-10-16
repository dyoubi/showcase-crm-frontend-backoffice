import React from 'react';
import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { Checkbox, CheckboxProps } from './index';

export default {
  title: 'components/Checkbox',
  component: Checkbox,
  argTypes: {
    color: ArgsTypes.colors,
    label: ArgsTypes.text,
    caption: ArgsTypes.text,
  },
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} name="test" />;

export const Default = Template.bind({});

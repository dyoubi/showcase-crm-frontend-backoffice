import { Provider } from 'react-redux';

import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { store } from '@/libs/store';

import { DatePicker, DatePickerProps } from './index';

export default {
  title: 'components/DatePicker',
  component: DatePicker,
  decorators: [(DatePickerStory) => (
    <Provider store={store}>
      <DatePickerStory />
    </Provider>
  )],
  argTypes: {
    color: ArgsTypes.colors,
    label: ArgsTypes.text,
    caption: ArgsTypes.text,
    value: ArgsTypes.date,
  },
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});

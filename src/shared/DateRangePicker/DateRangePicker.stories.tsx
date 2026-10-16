import { Provider } from 'react-redux';
import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { store } from '@/libs/store';

import { DateRangePicker, DateRangePickerProps } from './index';

export default {
  title: 'components/DateRangePicker',
  component: DateRangePicker,
  decorators: [(DateRangePickerStory) => (
    <Provider store={store}>
      <DateRangePickerStory />
    </Provider>
  )],
  argTypes: {
    color: ArgsTypes.colors,
    label: ArgsTypes.text,
    caption: ArgsTypes.text,
    value: ArgsTypes.date,
  },
} as Meta;

const Template: Story<DateRangePickerProps> = (args) => <DateRangePicker {...args} />;

export const Default = Template.bind({});

import type { Meta, StoryFn as Story } from '@storybook/react';

import { Colors } from '@emotion/react';
import { FeedbackMessage } from '.';
import { FeedbackMessageProps } from './FeedbackMessage.types';

const colors: Array<Colors> = ['primary', 'secondary', 'tertiary', 'success', 'danger', 'warning'];

export default {
  title: 'Components/FeedbackMessage',
  component: FeedbackMessage,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
    children: {
      control: { type: 'text' },
    },
  },
} as Meta;

const Template: Story<FeedbackMessageProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <FeedbackMessage {...args} />
);

export const Default = Template.bind({});

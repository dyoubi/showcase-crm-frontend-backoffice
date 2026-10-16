import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { TextArea } from '.';

export default {
  title: 'Components/TextArea',
  component: TextArea,
  argTypes: {
    color: ArgsTypes.colors,
    caption: ArgsTypes.text,
  },
} as Meta;

const Template: Story = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <TextArea {...args} />
);

export const Default = Template.bind({});

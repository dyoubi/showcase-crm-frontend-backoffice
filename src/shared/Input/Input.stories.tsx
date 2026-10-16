import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { Input, InputPropsType } from '.';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    color: ArgsTypes.colors,
    buttonContent: ArgsTypes.text,
    caption: ArgsTypes.text,
    rightIcon: ArgsTypes.icons,
    leftIcon: ArgsTypes.icons,
  },
} as Meta;

const Template: Story<InputPropsType> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Input {...args} />
);

export const Default = Template.bind({});

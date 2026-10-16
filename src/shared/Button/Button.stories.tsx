import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { Button, ButtonPropsType } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: ArgsTypes.colors,
    rightIcon: ArgsTypes.icons,
    leftIcon: ArgsTypes.icons,
    size: { options: ['l', 'xl'] },
    children: ArgsTypes.text,
  },
} as Meta;

const Template: Story<ButtonPropsType> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Button {...args} />
);

export const Default = Template.bind({});

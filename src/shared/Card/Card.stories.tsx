import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';

import { Card } from '.';

import { CardProps } from './types';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    children: ArgsTypes.text,
    icon: ArgsTypes.icons,
    status: {
      options: [
        'base',
        ...ArgsTypes.colors.options
      ],
    },
    title: ArgsTypes.text,
    width: ArgsTypes.number,
  },
} as Meta;

const Template: Story<CardProps> = (args: CardProps) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Card {...args} />
);

export const Default = Template.bind({ width: 480 });

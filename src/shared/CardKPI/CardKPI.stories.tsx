import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { CardKPI, CardKPIProps } from '.';

export default {
  title: 'Components/CardKPI',
  component: CardKPI,
  argTypes: {
    color: ArgsTypes.colors,
    icon: ArgsTypes.icons,
    kpiName: ArgsTypes.text,
    value: ArgsTypes.text,
  },
} as Meta;

const Template: Story<CardKPIProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <CardKPI {...args} />
);

export const Default = Template.bind({});

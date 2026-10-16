import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { Badge } from '.';
import { BadgePropsType } from './types';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color: ArgsTypes.colors,
    children: ArgsTypes.text,
  },
} as Meta;

const Template: Story<BadgePropsType> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Badge {...args} />
);

export const Default = Template.bind({});

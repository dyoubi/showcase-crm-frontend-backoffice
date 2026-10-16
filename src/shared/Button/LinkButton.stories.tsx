import type { Meta, StoryFn as Story } from '@storybook/react';

import { ArgsTypes } from '@/libs/storybook';
import { LinkButton, LinkButtonPropsType } from './LinkButton';

export default {
  title: 'Components/LinkButton',
  component: LinkButton,
  argTypes: {
    children: ArgsTypes.text,
    color: ArgsTypes.colors,
    href: ArgsTypes.text,
    leftIcon: ArgsTypes.icons,
    rightIcon: ArgsTypes.icons,
    size: { options: ['l', 'xl'] },
  },
} as Meta;

const Template: Story<LinkButtonPropsType> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <LinkButton {...args} />
);

export const Default = Template.bind({});

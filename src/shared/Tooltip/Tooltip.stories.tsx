import React from 'react';
import type { Meta, StoryFn as Story } from '@storybook/react';

import { Tooltip, TooltipProps } from '.';

export default {
  title: 'ui/Tooltip',
  component: Tooltip,
  args: {
    message: 'Mon tooltip mesage',
  },
} as Meta;

const Template: Story<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <span>Cliquez moi dessus</span>
  </Tooltip>
);

export const Default = Template.bind({});

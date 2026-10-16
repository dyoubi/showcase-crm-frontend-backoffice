// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import type { Meta, StoryFn as Story } from '@storybook/react';

import React from 'react';
import { Modal } from '.';

export default {
  title: 'shared/Modals',
  component: Modal,
  argTypes: {},
} as Meta;

const Template: Story = () => <Modal show>Modal content ;)</Modal>;

export const Default = Template.bind({});

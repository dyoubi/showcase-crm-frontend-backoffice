import { Story } from '@storybook/react';

import { LogoBitplay } from './LogoBitplay';

export default {
  component: LogoBitplay,
  title: 'Components/LogoBitplay',
};

const Template: Story = ({ ...args }) => <LogoBitplay {...args} />;

export const Primary = Template.bind({});

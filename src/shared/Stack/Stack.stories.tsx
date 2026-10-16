import { Meta, StoryFn as Story } from '@storybook/react';

import { Card } from '../Card';

import { Stack, StackItem } from '.';

export default {
  title: 'Components/Stack',
  component: Stack,
} as Meta;

const data = [{
  label: 'name',
  value: 'Smith Doe',
}, {
  label: 'email',
  value: 'smith@gmail.com',
}, {
  label: 'status',
  value: 'ACTIVE',
}] as const;

const Template: Story = () => (
  <Card>
    <Stack>
      {data.map((item) => (
        <StackItem
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </Stack>
  </Card>
);

export const Default = Template.bind({});

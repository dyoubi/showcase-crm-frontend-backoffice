import { Meta, StoryFn as Story } from '@storybook/react';

import { AppThemeProvider } from '@/components/AppThemeProvider';

import { Card } from '../Card';
import { IconChat, IconShieldLock } from '../Icons';

import { Table } from '.';

export default {
  title: 'Components/Table',
  argTypes: {
    fullWidth: {
      control: 'boolean',
      defaultValue: true,
    },
    size: {
      control: { type: 'inline-radio' },
      defaultValue: 'm',
      options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    zebra: {
      control: 'boolean',
      defaultValue: true,
    },
  },
  component: Table,
  decorators: [(TableStory) => (
    <AppThemeProvider>
      <TableStory />
    </AppThemeProvider>
  )],
} as Meta;

const array = [
  {
    name: 'Smith Doe',
    image: 'http://demos.ui-lib.com/gull/dist-assets/images/faces/1.jpg',
    email: 'smith@gmail.com',
    status: 'ACTIVE',
  },
  {
    name: 'John Doe',
    image: 'http://demos.ui-lib.com/gull/dist-assets/images/faces/1.jpg',
    email: 'john-doe@gmail.com',
    status: 'ACTIVE',
  },
  {
    name: 'Alex',
    image: 'http://demos.ui-lib.com/gull/dist-assets/images/faces/1.jpg',
    email: 'john-doe@gmail.com',
    status: 'ACTIVE',
  },
] as const;

const Template: Story = () => (
  <Card>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Avatar</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {array.map((item, index) => (
          <tr key={item.name}>
            <td>{index}</td>
            <td>{item.name}</td>
            <td>
              <img width={29} style={{ borderRadius: '100%' }} src={item.image} alt="User Avatar" role="presentation" />
            </td>
            <td>{item.status}</td>
            <td>
              <IconShieldLock />
            </td>
            <td>
              <IconChat />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Card>
);

export const Default = Template.bind({});

import { Fragment } from 'react';
import { Meta, StoryFn as Story } from '@storybook/react';

import { Card } from '../Card';

import { SimpleTable } from '.';

export default {
  title: 'Components/SimpleTable',
  component: SimpleTable,
} as Meta;

const data = [{
  name: 'Smith Doe',
  email: 'smith@gmail.com',
  status: 'ACTIVE',
}, {
  name: 'John Doe',
  email: 'john-doe@gmail.com',
  status: 'ACTIVE',
}, {
  name: 'Alex',
  email: 'john-doe@gmail.com',
  status: 'ACTIVE',
}] as const;

const Template: Story = () => (
  <Card>
    <SimpleTable>
      {data.map((item) => (
        <Fragment key={item.name}>
          <tr>
            <th>Name</th>
            <td>{item.name}</td>
          </tr>

          <tr>
            <th>Email</th>
            <td>{item.email}</td>
          </tr>

          <tr>
            <th>Status</th>
            <td>{item.status}</td>
          </tr>
        </Fragment>
      ))}
    </SimpleTable>
  </Card>
);

export const Default = Template.bind({});

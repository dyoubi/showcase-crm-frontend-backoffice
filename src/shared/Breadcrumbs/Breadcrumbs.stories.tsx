import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryFn as Story } from '@storybook/react';

import { Breadcrumbs } from '.';

export default {
  title: 'components/Breadcrumbs',
  decorators: [(BreadcrumbsStory) => (
    <BrowserRouter>
      <BreadcrumbsStory />
    </BrowserRouter>
  )],
} as Meta;

const Template: Story = () => (
  <Breadcrumbs
    breadcrumbs={[{
      content: 'Carousels',
      link: '#',
    }, {
      content: 'My carousel 1',
    }]}
  />
);

export const Default = Template.bind({});

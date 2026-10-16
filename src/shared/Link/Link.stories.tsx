import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryFn as Story } from '@storybook/react';

import { AppThemeProvider } from '@/components/AppThemeProvider';

import { Link } from '.';

import { LinkPropsType } from './types';

export default {
  title: 'Components/Link',
  args: {
    href: '#',
  },
  argTypes: {
    href: { control: 'text' }
  },
  component: Link,
  decorators: [(LinkStory) => (
    <BrowserRouter>
      <AppThemeProvider>
        <LinkStory />
      </AppThemeProvider>
    </BrowserRouter>
  )],
} as Meta;

const Template: Story<LinkPropsType> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Link {...args} />
);

export const Default = Template.bind({});

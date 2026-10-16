import React from 'react';
import type { Meta, StoryFn as Story } from '@storybook/react';

import * as Icons from '../Icons';
import { Tabs, TabsProps } from '.';
import { Card } from '../Card';

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as Meta;

const Template: Story<TabsProps> = () => {
  const [tab, setTab] = React.useState('1');
  return (
    <Card>
      <Tabs
        selectedTabId={tab}
        onSelect={setTab}
        tabs={[
          { tabId: '1', icon: Icons.IconKey, title: 'Mon titre 1 ', content: 'Contenu 1' },
          { tabId: '2', title: 'Mon titre 2 ', content: 'Contenu 2' },
          { tabId: '3', title: 'Mon titre 3 ', content: 'Contenu 3' },
          { tabId: '4', icon: Icons.IconChat, content: 'Contenu 3' },
          { tabId: '5', icon: Icons.IconDiscount, content: 'Contenu 3' },
          { tabId: '6', icon: Icons.IconBasket, content: 'Contenu 3' },
        ]}
      />
    </Card>
  );
};

export const Default = Template.bind({});

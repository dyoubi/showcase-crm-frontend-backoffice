import { memo, useState } from 'react';

import { Card } from '@/shared/Card';
import { IconEmail, IconDocument } from '@/shared/Icons';
import { Tabs } from '@/shared/Tabs';

import { ActivitiesTab } from '../ActivitiesTab';
import { CasesTab } from '../CasesTab';

const tabs = [
  { tabId: 'activities', icon: IconEmail, content: <ActivitiesTab /> },
  { tabId: 'cases', icon: IconDocument, content: <CasesTab /> },
];

export const AdminUserActivities = memo(() => {
  const [tab, setTab] = useState(tabs[0].tabId);

  return (
    <Card>
      <Tabs
        selectedTabId={tab}
        onSelect={setTab}
        tabs={tabs}
      />
    </Card>
  );
});

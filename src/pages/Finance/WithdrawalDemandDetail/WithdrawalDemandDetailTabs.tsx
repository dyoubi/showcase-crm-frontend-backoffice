import { memo, useState } from 'react';

import { Card } from '@/shared/Card';
import { Tabs } from '@/shared/Tabs';

import { Report } from '@/domains/finance/withdrawals';

// import { CommentsTab } from '@/components/CommentsTab';
import { ReportsTab } from '@/components/ReportsTab';

// Disable eslint in this line as work is pending to include Comments
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WithdrawalDemandDetailTabs = memo<{ withdrawalId: string, reports?: Report[] }>(({ withdrawalId, reports }) => {
  const [tab, setTab] = useState('reports');

  return (
    <Card
      style={{ flex: 1 }}
    >
      <Tabs
        onSelect={setTab}
        selectedTabId={tab}
        tabs={[{
          tabId: 'reports',
          title: 'Reports',
          content: <ReportsTab reports={reports} />,
        // TODO: This will be implemented on a different ticket
        // }, {
        //   tabId: 'comments',
        //   title: 'Comments',
        //   content: <CommentsTab contextId={withdrawalId} />,
        }]}
      />
    </Card>
  );
});

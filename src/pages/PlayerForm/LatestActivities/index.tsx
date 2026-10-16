import { memo } from 'react';

import { Tabs, useTabState } from '@/shared/Tabs';
import { Card } from '@/shared/Card';

import * as c from './constants';

export const LatestActivities = memo<{ playerId?: string }>((props) => {
  const { playerId } = props;

  const [selectedTabId, setSelectedTabId] = useTabState(c.tabs[0].tabId)

  if (!playerId) {
    return null;
  }

  return (
    <Card title="Latest Activities">
      <Tabs
        onSelect={setSelectedTabId}
        tabs={c.tabs.map(tab => ({
          ...tab,
          content: <tab.content playerId={playerId} />
        }))}
        selectedTabId={selectedTabId}
      />
    </Card>
  );
});

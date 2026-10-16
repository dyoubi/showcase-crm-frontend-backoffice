import { memo } from 'react';

import { Page } from '@/components/Page';

import { MediaManager } from '@/components/MediaManager';

export const MediaManagement = memo(() => {
  return (
    <Page headTitle="Media Manager" breadcrumbs={[{ content: 'Media Manager' }]}>
      <MediaManager />
    </Page>
  );
});

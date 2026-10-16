import { memo, useState } from 'react';

import { Card } from '@/shared/Card';
import { Tabs } from '@/shared/Tabs';

import { EPaymentMandateType, PaymentMandateType } from '@/domains/finance/payments';
import { Report } from '@/domains/finance/withdrawals';

// import { CommentsTab } from '@/components/CommentsTab';
import { ReportsTab } from '@/components/ReportsTab';

interface PaymentMandateDetailTabs {
  reports?: Report[];
  type: PaymentMandateType,
}

export const PaymentMandateDetailTabs = memo<PaymentMandateDetailTabs>((props) => {
  const {
    reports,
    type,
  } = props;

  const [tab, setTab] = useState('reports');

  // e.g. Refund.
  // This should have their own section based on business requirements
  if (type === EPaymentMandateType.WITHDRAWAL) {
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
  }

  return (
    <div style={{ flex: 1, padding: 18, }}></div>
  );
});

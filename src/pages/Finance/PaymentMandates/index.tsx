import React, { useState } from 'react';

import { Page } from '@/components/Page';
import { Spacer } from '@/shared/Spacer';

import PaymentsTable from './PaymentMandatesTable';
import PaymentsFilters from './PaymentMandatesFilters';

import { PaymentFilters } from './types';

import { FILTERS_DEFAULT } from './constants';

export const PaymentMandates: React.FC = () => {
  const [filters, setFilters] = useState<PaymentFilters>(FILTERS_DEFAULT);

  return (
    <Page
      breadcrumbs={[{ content: 'Payment Mandates' }]}
      headTitle="Payment Mandates"
    >
      <h1>
        Payments Mandates
      </h1>

      <PaymentsFilters
        filters={filters}
        setFilters={setFilters}
      />

      <Spacer />

      <PaymentsTable filters={filters} />
    </Page>
  );
};

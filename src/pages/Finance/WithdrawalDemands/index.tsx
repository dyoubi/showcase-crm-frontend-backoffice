import React, { useState } from 'react';

import { Page } from '@/components/Page';
import { Spacer } from '@/shared/Spacer';

import WithdrawalDemandsTable from './WithdrawalDemandsTable';
import WithdrawalDemandsFilters from './WithdrawalDemandsFilters';

import { WithdrawalFilters } from './types';

import { FILTERS_DEFAULT } from './constants';

export const WithdrawalDemands: React.FC = () => {
  const [filters, setFilters] = useState<WithdrawalFilters>(FILTERS_DEFAULT);

  return (
    <Page
      breadcrumbs={[{ content: 'Withdrawal Demands' }]}
      headTitle="Withdrawal Demands"
    >
      <h1>
        Withdrawal Demands
      </h1>

      <WithdrawalDemandsFilters
        filters={filters}
        setFilters={setFilters}
      />

      <Spacer />

      <WithdrawalDemandsTable filters={filters} />
    </Page>
  );
};

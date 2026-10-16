import { useState } from 'react';
import { routes } from '@/libs/router/constants';

import { useAppDateFormat } from '@/hooks';

import { useGetPaymentMandatesList, PaymentMandateSortByType, PaymentMandateSortDirectionType } from '@/domains/finance/payments';

import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { IconEye } from '@/shared/Icons';
import { Link } from '@/shared/Link';
import { Pill } from '@/shared/Pill';
import { Table } from '@/shared/Table';

import { Pagination, PaginationHelpers } from '@/components/Pagination';
import { Spacer } from '@/shared/Spacer';

import { replaceUrlParameters } from '@/utils';

import { DEFAULT_RESULTS_PER_PAGE } from '@/components/Pagination/constants';
import { PAYMENT_MANDATE_STATUSES_TO_PILL_COLOR } from './constants';

import PaymentsHeader from './PaymentMandatesHeader';

import { PaymentFilters, PaymentSort } from './types';

const RESULTS_PER_PAGE_OPTIONS = [{
  label: 100,
  value: 100,
}, {
  label: 200,
  value: 200,
}, {
  label: 300,
  value: 300,
}, {
  label: 400,
  value: 400,
}, {
  label: 500,
  value: 500,
}];


const PaymentsTable = (props: { filters: PaymentFilters; }) => {
  const {
    filters,
  } = props;

  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(DEFAULT_RESULTS_PER_PAGE);
  const [sortConfig, setSortConfig] = useState<{ value: PaymentSort['sortBy'], direction: PaymentSort['sortDirection'] }>({
    value: PaymentMandateSortByType.CREATED_AT,
    direction: PaymentMandateSortDirectionType.ASC,
  });

  const { formatDate } = useAppDateFormat();

  const {
    data,
    isError,
    isLoading,
  } = useGetPaymentMandatesList({
    currency: filters.currency.value,
    status: filters.status.value,

    sortBy: sortConfig.value,
    sortDirection: sortConfig.direction,

    ...PaginationHelpers.getOffsetAndLimit({ currentPage, resultsPerPage }),
  });

  const { count, data: results } = data || {};

  const render = () => {
    if (isError) {
      return (
        <tr>
          <td colSpan={6}>
            Error loading payments. Please try refreshing the page.
          </td>
        </tr>
      );
    }

    if (isLoading) {
      return (
        <tr>
          <td colSpan={6}>
            Loading...
          </td>
        </tr>
      );
    }

    if (!results?.length) {
      return (
        <tr>
          <td colSpan={6}>
            No available payments. Try adjusting the filters.
          </td>
        </tr>
      );
    }

    return results.map(mandate => (
      <tr key={mandate.id}>
        <td>{formatDate(mandate.date, { displayFullDate: true })}</td>
        <td>{mandate.username}</td>
        <td>{mandate.amount}</td>
        <td>{mandate.currency}</td>

        <td>
          <Pill color={PAYMENT_MANDATE_STATUSES_TO_PILL_COLOR[mandate.status]}>
            {mandate.status}
          </Pill>
        </td>

        <td>
          <Flex justifyContent="center">
            <Link href={replaceUrlParameters(routes.PAYMENT_DETAIL, { mandateId: mandate.id })}>
              <IconEye />
            </Link>
          </Flex>
        </td>
      </tr>
    ));
  };

  return (
    <Card
      loadingOverlay={isLoading}
      title="Results"
    >
      <Pagination
        currentPage={currentPage}
        handleResultsPerPage={setResultsPerPage}
        handleCurrentPage={setCurrentPage}
        maxResults={count}
        options={RESULTS_PER_PAGE_OPTIONS}
        resultsPerPage={resultsPerPage}
      />

      <Spacer size="s" />

      <Table size="s" zebra>
        <thead>
          <tr>
            <PaymentsHeader
              label="Date"
              setSortConfig={setSortConfig}
              sort={PaymentMandateSortByType.CREATED_AT}
              sortConfig={sortConfig}
            />

            <PaymentsHeader
              label="Username"
              setSortConfig={setSortConfig}
              sort={PaymentMandateSortByType.OWNER_USERNAME}
              sortConfig={sortConfig}
            />

            <PaymentsHeader
              setSortConfig={setSortConfig}
              sort={PaymentMandateSortByType.AMOUNT}
              sortConfig={sortConfig}
            />

            <th>Currency</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {render()}
        </tbody>
      </Table>

      <Spacer size="l" />

      <Pagination
        currentPage={currentPage}
        handleResultsPerPage={setResultsPerPage}
        handleCurrentPage={setCurrentPage}
        maxResults={count}
        options={RESULTS_PER_PAGE_OPTIONS}
        resultsPerPage={resultsPerPage}
      />
    </Card>
  );
};

export default PaymentsTable;

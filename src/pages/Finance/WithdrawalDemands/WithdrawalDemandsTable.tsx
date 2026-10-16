import { useState } from 'react';
import { routes } from '@/libs/router/constants';

import { useAppDateFormat } from '@/hooks';

import { useGetWithdrawalDemandsList, EWithdrawalSortByType, EWithdrawalSortDirectionType } from '@/domains/finance/withdrawals';

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
import { WITHDRAWAL_DEMAND_STATUSES_TO_PILL_COLOR } from './constants';

import WithdrawalDemandsHeader from './WithdrawalDemandsHeader';

import { WithdrawalFilters, WithdrawalSort } from './types';

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


const WithdrawalDemandsTable = (props: { filters: WithdrawalFilters; }) => {
  const {
    filters,
  } = props;

  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(DEFAULT_RESULTS_PER_PAGE);
  const [sortConfig, setSortConfig] = useState<{ value: WithdrawalSort['sortBy'], direction: WithdrawalSort['sortDirection'] }>({
    value: EWithdrawalSortByType.CREATED_AT,
    direction: EWithdrawalSortDirectionType.ASC,
  });

  const { formatDate } = useAppDateFormat();

  const {
    data,
    isError,
    isLoading,
  } = useGetWithdrawalDemandsList({
    username: filters.username,
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
            Error loading withdrawal demands. Please try refreshing the page.
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
            No available withdrawal demands. Try adjusting the filters.
          </td>
        </tr>
      );
    }

    return results.map(withdrawal => (
      <tr key={withdrawal.id}>
        <td>{formatDate(withdrawal.date, { displayFullDate: true })}</td>
        <td>{withdrawal.player.nickname}</td>
        <td>{withdrawal.amount}</td>
        <td>{withdrawal.currency}</td>

        <td>
          <Pill color={WITHDRAWAL_DEMAND_STATUSES_TO_PILL_COLOR[withdrawal.status]}>
            {withdrawal.status.replaceAll('-', ' ')}
          </Pill>
        </td>

        <td>
          <Flex justifyContent="center">
            <Link href={replaceUrlParameters(routes.WITHDRAWAL_DETAIL, { demandId: withdrawal.id })}>
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
            <WithdrawalDemandsHeader
              label="Date"
              setSortConfig={setSortConfig}
              sort={EWithdrawalSortByType.CREATED_AT}
              sortConfig={sortConfig}
            />

            <WithdrawalDemandsHeader
              label="Username"
              setSortConfig={setSortConfig}
              sort={EWithdrawalSortByType.OWNER_USERNAME}
              sortConfig={sortConfig}
            />

            <WithdrawalDemandsHeader
              setSortConfig={setSortConfig}
              sort={EWithdrawalSortByType.AMOUNT}
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

export default WithdrawalDemandsTable;

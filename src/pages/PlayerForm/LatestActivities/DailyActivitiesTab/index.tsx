import { memo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDateFormat } from '@/hooks';
import { GetDailyActivityFilter, useGetDailyActivity } from '@/domains/casino/player/activity';

import { Balance, OperationTypeEnum } from '@/domains/casino/player/balance';

import { Pill } from '@/shared/Pill';
import { Spacer } from '@/shared/Spacer';
import { Table } from '@/shared/Table';

import { Pagination, PaginationHelpers, PaginationTypes } from '@/components/Pagination';
import { ToolTipPriceFiat } from '@/components/ToolTipPriceFiat';

import { getBeginAndEndDates } from '@/domains/account/dateFormat';
import { titleCase } from '@/utils';

import DailyActivitiesTabFilter from '../DailyActivitiesTabFilter';

import * as c from './constants';

export const DailyActivitiesTab = memo<{ playerId?: string }>((props) => {
  const { playerId } = props;

  const { playerId: paramPlayerId } = useParams();
  const selectedPlayerId = playerId || paramPlayerId;

  const [filter, setFilter] = useState<GetDailyActivityFilter>(c.DEFAULT_FILTER);

  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState<PaginationTypes.ResultsPerPage>(c.DEFAULT_RESULTS_PER_PAGE);

  const { formatDate } = useAppDateFormat();

  const handleDateInterval = (intervalObject: { start: Date, end: Date }) => {
    setCurrentPage(0);
    setFilter((currentFilter) => ({
      ...currentFilter,

      begin: intervalObject.start?.toISOString(),
      end: intervalObject.end?.toISOString(),
    }));
  };

  const handleSelection = (selection: number) => {
    const { begin, end } = getBeginAndEndDates({ daysFromToday: selection });

    setCurrentPage(0);
    setFilter((currentFilter) => ({
      ...currentFilter,
      begin: begin.toISOString(),
      end: end.toISOString(),
    }));
  }

  const { data: response, isError, isFetching, isLoading } = useGetDailyActivity(selectedPlayerId, {
    ...filter,

    ...PaginationHelpers.getOffsetAndLimit({ currentPage, resultsPerPage }),
  });

  const render = () => {
    if (isLoading || isFetching) {
      return (
        <tr>
          <td colSpan={5}>
            Loading...
          </td>
        </tr>
      );
    }

    if (isError) {
      return (
        <tr>
          <td colSpan={5}>
            Error loading data. Please try refreshing the page.
          </td>
        </tr>
      );
    }

    if (!response?.data.length) {
      return (
        <tr>
          <td colSpan={5}>
            No daily activity found. Please adjust your search.
          </td>
        </tr>
      );
    }

    const { data } = response;

    return data.map(activity => (
      <tr key={activity.id}>
        <td>
          {formatDate(activity.createdAt, { displayFullDate: true })}
        </td>

        <td>
          {titleCase(OperationTypeEnum[activity.type])}
        </td>

        <td>
          {titleCase(activity.category)}
          {(activity.bonus) ? (
            <>: <em>{activity.bonus.name}</em></>
          ) : null}
        </td>

        <td>
          {(activity.withdrawal) ? (
            <Pill color={c.WITHDRAWAL_STATUSES_TO_PILL_COLOR[activity.withdrawal.status]}>
              {activity.withdrawal.status}
            </Pill>
          ) : '—'}
        </td>

        <td>
          <ToolTipPriceFiat currency={activity.coin}>
            {activity.value}
          </ToolTipPriceFiat>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <DailyActivitiesTabFilter
        handleDateInterval={handleDateInterval}
        handleSelection={handleSelection}
        selectedCurrency={filter.coin}
        setCurrency={(coin: Balance['coin']) => setFilter((prevFilter) => ({ ...prevFilter, coin }))}
      >
          <Pagination
            currentPage={currentPage}
            handleResultsPerPage={setResultsPerPage}
            handleCurrentPage={setCurrentPage}
            maxResults={response?.count}
            options={c.RESULTS_PER_PAGE_OPTIONS}
            resultsPerPage={resultsPerPage}
          />
      </DailyActivitiesTabFilter>
      <Spacer size="l" />

      <Table overflow zebra>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {render()}
        </tbody>
      </Table>
      <Spacer size="l" />

      {(
        response?.count
        && response.count > 24
      ) ? (
        <Pagination
          currentPage={currentPage}
          handleResultsPerPage={setResultsPerPage}
          handleCurrentPage={setCurrentPage}
          maxResults={response.count}
          options={c.RESULTS_PER_PAGE_OPTIONS}
          resultsPerPage={resultsPerPage}
        />
      ) : null}
    </>
  );
});

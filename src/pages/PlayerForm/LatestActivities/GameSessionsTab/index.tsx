import { memo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDateFormat, useAppTheme } from '@/hooks';
import { useSessionBets } from '@/domains/casino/player/logginSession';
import { getBeginAndEndDates } from '@/domains/account/dateFormat';
import { useGetGroupedGameSessions } from '@/domains/casino/player/gameSessions';
import { Balance, Session, useGetPlayerBalances } from '@/domains/casino/player/balance';

import { Button, LinkButton } from '@/shared/Button';
import { Spacer } from '@/shared/Spacer';
import { Table } from '@/shared/Table';

import { Pagination, PaginationTypes } from '@/components/Pagination';
import { ToolTipPriceFiat } from '@/components/ToolTipPriceFiat';

import { routes } from '@/libs/router/constants';
import { downloadCsvFile, replaceUrlParameters } from '@/utils';

import { Flex } from '@/shared/Flex';
import { IconDownload, IconEye } from '@/shared/Icons';
import GameSessionTabFilter from '../GameSessionTabFilter';

import * as c from './constants';

export const GameSessionsTab = memo<{ playerId?: string }>((props) => {
  const { playerId } = props;

  const { playerId: paramPlayerId } = useParams();
  const selectedPlayerId = playerId || paramPlayerId;

  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState<PaginationTypes.ResultsPerPage>(c.DEFAULT_RESULTS_PER_PAGE);

  const [filter, setFilter] = useState(c.DEFAULT_FILTER);

  const { formatDate } = useAppDateFormat();
  const { isDarkMode } = useAppTheme();
  const { calculateSessionBets } = useSessionBets();

  const {
    data: gameSessionsData,
    isFetching: isGameSessionsFetching,
    isLoading: isGameSessionsLoading,
    isError: isGameSessionsError,
  } = useGetGroupedGameSessions(selectedPlayerId, {
    ...filter,

    // TODO @USER-ACTIVITY: Fix pagination as all results must be requested from the DB in order to get the values
    // ...PaginationHelpers.getOffsetAndLimit({ currentPage, resultsPerPage })
  });
  const {
    data: balancesData,
    isFetching: isBalancesFetching,
    isLoading: isBalancesLoading,
    isError: isBalancesError,
  } = useGetPlayerBalances(selectedPlayerId);

  const handleDateInterval = (intervalObject: { start: Date, end: Date }) => {
    setCurrentPage(0);
    setFilter((currentFilter) => ({
      ...currentFilter,

      begin: intervalObject.start?.toISOString(),
      end: intervalObject.end?.toISOString(),
    }));
  };

  const handleOnClickDownload = (currentLoginSession: Session[], sessionDate: string) => () => {
    const dataToDownload: (string | number)[][] = [];

    currentLoginSession.forEach(session => {
      if (!session.actions) {
        return;
      }

      session.actions.forEach(action => dataToDownload.push([
        action.id,
        `"${new Date(action.createdAt).toUTCString()}"`,
        (action.amount / 10 ** action.balancePrecision),
        action.type,
        session.coinBalance,
        session.coinInGame,
        session.machineId,
      ]));
    });

    return downloadCsvFile({
      data: dataToDownload,
      filename: `${(new Date().toISOString()).split('T')[0]}_${playerId}_game-session-${sessionDate}.csv`,
      headers: [
        'id',
        'timestamp',
        'amount',
        'win/bet',
        'currency',
        'currencyInGame',
        'machineId',
      ],
    });
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

  const render = () => {
    if (
      isGameSessionsFetching
      || isGameSessionsLoading
      || isBalancesFetching
      || isBalancesLoading
    ) {
      return (
          <tr>
            <td colSpan={11}>
              Loading...
            </td>
          </tr>
      );
    }

    if (isGameSessionsError || isBalancesError) {
      return (
          <tr>
            <td colSpan={11}>
              Error loading data. Please try refreshing the page.
            </td>
          </tr>
      );
    }

    const sessionsByDate = Object.keys(gameSessionsData || {});

    if (!sessionsByDate.length) {
      return (
          <tr>
            <td colSpan={11}>
              No sessions found. Please adjust your search.
            </td>
          </tr>
      );
    }

    return sessionsByDate.map((sessionDate) => {
      // TODO: We could only use sessionsByDate as it is already filtered in the BE
      const currentLoginSession = gameSessionsData?.[sessionDate] ?? [];
      const lastOperation = currentLoginSession?.at(0);
      const firstOperation = currentLoginSession?.at(-1);
      const selectedCoinBalance = balancesData?.find((balance) => balance.coin === filter.coin);
      const { income, maxBet, totalBets, totalWins } = calculateSessionBets(currentLoginSession);

      if (!firstOperation || !lastOperation || !selectedCoinBalance) return null;

      // TODO @USER-ACTIVITY: Fix with correct fields when new endpoint is available
      const parsedBalance = Number(selectedCoinBalance.value) - Number(selectedCoinBalance.value);

      // TODO @ESTEBAN: TBD based on Customer Service feedback.
      let calculatedBalance: keyof typeof BALANCE_COLOR = 'EQUAL';

      if (parsedBalance < 0) {
        calculatedBalance = 'LOSS';
      }

      if (parsedBalance > 0) {
        calculatedBalance = 'WIN';
      }

      const hasActions = currentLoginSession.some(session => session.actions);

      return (
        <tr key={sessionDate}>
          <td>{formatDate(firstOperation.createdAt, { displayFullDate: true })}</td>
          <td>{formatDate(lastOperation.createdAt, { displayFullDate: true })}</td>
          <td>TIMEOUT</td>

          <td>
            <ToolTipPriceFiat currency={filter.coin}>
              {selectedCoinBalance.value}
            </ToolTipPriceFiat>
          </td>

          <td>
            <span style={{ color: BALANCE_COLOR[calculatedBalance]}}>
              <ToolTipPriceFiat currency={filter.coin}>
                {selectedCoinBalance.value}
              </ToolTipPriceFiat>
            </span>
          </td>

          <td>{currentLoginSession.length}</td>

          <td>
            <ToolTipPriceFiat currency={filter.coin}>
              {totalBets}
            </ToolTipPriceFiat>
          </td>

          <td>
            <ToolTipPriceFiat currency={filter.coin}>
              {totalWins}
            </ToolTipPriceFiat>
          </td>

          <td>
            <ToolTipPriceFiat currency={filter.coin}>
              {income}
            </ToolTipPriceFiat>
          </td>

          <td>
            <ToolTipPriceFiat currency={filter.coin}>
              {maxBet}
            </ToolTipPriceFiat>
          </td>

          <td>
            <Flex flexDirection="row" justifyContent="center" gap={16}>
              <LinkButton
                color="secondary"
                disabled={!hasActions}
                href={`${replaceUrlParameters(routes.LOGIN_SESSION, {
                  id: 'session',
                })}?date=${sessionDate}&playerId=${selectedPlayerId}&currency=${filter.coin}`}
                target='_blank'
              >
                <IconEye />
              </LinkButton>

              <Button
                color="secondary"
                disabled={!hasActions}
                onClick={handleOnClickDownload(currentLoginSession, sessionDate)}
              >
                <IconDownload />
              </Button>
            </Flex>
          </td>
        </tr>
      );
    });
  };

  // Custom colors to improve contrast
  const BALANCE_COLOR = {
    EQUAL: 'inherit',
    LOSS: `${(isDarkMode) ? '#FF2E32' : '#B21F2E'}`,
    WIN: `${(isDarkMode) ? '#8CE3A2' : '#1A6B2D'}`,
  };

  return (
    <>
      <GameSessionTabFilter
        handleDateInterval={handleDateInterval}
        handleSelection={handleSelection}
        selectedCurrency={filter.coin}
        setCurrency={(coin: Balance['coin']) => setFilter((prevFilter) => ({ ...prevFilter, coin }))}
      >
        <Pagination
          currentPage={currentPage}
          handleResultsPerPage={setResultsPerPage}
          handleCurrentPage={setCurrentPage}
          // TODO: Adjust with the new endpoint
          // maxResults={response?.count}
          options={c.RESULTS_PER_PAGE_OPTIONS}
          resultsPerPage={resultsPerPage}
        />
      </GameSessionTabFilter>
      <Spacer size="l" />

      <Table overflow zebra>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>End Reason</th>
            <th>Start Balance</th>
            <th>End Balance</th>
            <th>Game Sessions</th>
            <th>Total Bets</th>
            <th>Total Wins</th>
            <th>Income</th>
            <th>Max Bet</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {render()}
        </tbody>
      </Table>

      {/* // TODO @USER-ACTIVITY: This will be improved when the user-activity service is ready  */}
      {/* {(
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
      ) : null} */}
    </>
  );
});

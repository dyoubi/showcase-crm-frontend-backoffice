import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDateFormat, useAppTheme } from '@/hooks';
import { useGetGameSessions } from '@/domains/casino/player/gameSessions';

import { ActionTypeEnum } from '@/domains/casino/player/balance';
import { Badge } from '@/shared/Badge';
import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { IconDice, IconList } from '@/shared/Icons';
import { LoadingOverlay } from '@/shared/LoadingOverlay';

import { CryptoCodes } from '@/domains/currency';
import { getBeginAndEndDates } from '@/domains/account/dateFormat';

import { ToolTipMachineName } from '../ToolTipMachineName';
import { ToolTipPriceFiat } from '../ToolTipPriceFiat';

import * as S from './styles';

interface BetsListProps {
  currency: CryptoCodes;
  date: string;
  playerId: string;
  sessionId?: string;
  width?: number | string;
}

export const BetsList = memo<BetsListProps>((props) => {
  const {
    currency,
    date,
    playerId,
    sessionId,
    width,
  } = props;

  const { formatDate } = useAppDateFormat();
  const { isDarkMode } = useAppTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { begin: beginDate, end: endDate } = getBeginAndEndDates({ begin: date, end: date })

  const {
    data: gameSessionsData,
    isFetching: isGameSessionsFetching,
    isLoading: isGameSessionsLoading,
    isError: isGameSessionsError,
  } = useGetGameSessions(playerId, {
    coin: currency,

    begin: beginDate.toISOString(),
    end: endDate.toISOString(),
  });

  const render = () => {
    if (isGameSessionsFetching || isGameSessionsLoading) {
      return <LoadingOverlay />;
    }

    if (isGameSessionsError) {
      return <p>Error loading data. Please try refreshing the page.</p>;
    }

    if (!gameSessionsData?.length) {
      return <p>No sessions found. Please adjust your search.</p>;
    }

    return (
      <S.Container isDarkMode={isDarkMode}>
        {(gameSessionsData).map((gameSession) => {
          if (!gameSession.actions) {
            return null;
          }

          const newSearchParams = (location.search.includes('sessionId'))
            ? location.search.replace(/(sessionId=)[^&]+/, `$1${gameSession.id}`)
            : `${location.search}&sessionId=${gameSession.id}`;
          const destinationPath = `${location.pathname}${newSearchParams}`;

          if (
            gameSession.id === sessionId
            && !location.state?.session
          ) {
            navigate(destinationPath, { replace: true, state: { session: gameSession } });
          }

          return gameSession.actions.map((action) => {
            const hasWon = action.type === ActionTypeEnum.WIN;

            return (
              <li key={action.id}>
                <S.BetLine
                  $isDarkMode={isDarkMode}
                  $isHover={gameSession.id === sessionId}
                  to={destinationPath}
                  state={{ session: gameSession }}
                  preventScrollReset
                  replace
                >

                  <Flex gap={14}>
                    <IconDice size={40} />

                    <Flex flexDirection="column">
                      <ToolTipMachineName>
                        {gameSession.machineId}
                      </ToolTipMachineName>

                      <span>
                        {formatDate(action.createdAt, { displayFullDate: true })}
                      </span>
                    </Flex>
                  </Flex>

                  <Flex
                    justifyContent="space-between"
                    flexShrink={0}
                    flexDirection="row"
                    alignItems="center"
                    gap={14}
                  >
                    <div style={{ minWidth: 50 }}>
                      <ToolTipPriceFiat
                        message="Bet amount"
                        currency={action.operation?.coin as CryptoCodes}
                      >
                        {action.operation?.value ?? 0}
                      </ToolTipPriceFiat>
                    </div>

                    <Flex justifyContent="center" style={{ width: 70 }}>
                      <Badge color={hasWon ? 'success' : 'danger'}>{hasWon ? 'WIN' : 'LOSS'}</Badge>
                    </Flex>
                  </Flex>
                </S.BetLine>
              </li>
            );
          });
        })}
      </S.Container>
    );
  };

  return (
    <Card icon={IconList} title="Bets" width={width}>
      {render()}
    </Card>
  );
});

import { useEffect, useState } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import { useGetPlayer } from '@/domains/casino/player';

import { BetsList } from '@/components/BetsList';
import { Page } from '@/components/Page';
import { Flex } from '@/shared/Flex';

import { routes } from '@/libs/router/constants';

import { CryptoCodes, ECryptoCodes } from '@/domains/currency';
import { Session } from '@/domains/casino/player/balance';

import { LoginSessionDetails } from './LoginSessionDetails';

export const LoginSession = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramCurrency = searchParams.get('currency');
  const paramDate = searchParams.get('date');
  const paramPlayerId = searchParams.get('playerId') || undefined;
  const paramSessionId = searchParams.get('sessionId') || '';

  const [playerId, setPlayerId] = useState(paramPlayerId);

  const { data: player } = useGetPlayer(playerId, { enabled: !!playerId });
  const { state } = useLocation();

  useEffect(() => {
    if (!paramCurrency) {
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        currency: ECryptoCodes.BTC,
      }));
    }

    if (!paramDate) {
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        date: (new Date().toISOString()).split('T')[0],
      }));
    }
  }, []);

  useEffect(() => {
    if (paramPlayerId) {
      setPlayerId(paramPlayerId);
    }

  }, [paramPlayerId]);

  const render = () => {
    if (!paramCurrency || !paramDate || !playerId) {
      return <p>Missing required params. Please refresh the page and try again.</p>;
    }

    return (
        <BetsList
          date={paramDate}
          playerId={playerId}
          currency={paramCurrency as CryptoCodes}
          sessionId={paramSessionId}
          width="65%"
        />
    );
  };

  return (
    <Page
      breadcrumbs={[
        { content: 'Players', link: routes.PLAYERS_LIST },
        { content: player?.nickname || paramPlayerId, link: `${routes.PLAYERS_LIST}${paramPlayerId}` },
        { content: 'Login Session', link: routes.BONUSES },
      ]}
    >
      <Flex flexDirection="row" gap={14}>
        {render()}

        <div style={{ width: '35%' }}>
          {(state?.session) ? <LoginSessionDetails session={state.session as Session} /> : null}
        </div>
      </Flex>
    </Page>
  );
};

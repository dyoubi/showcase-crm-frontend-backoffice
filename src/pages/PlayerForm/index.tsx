import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { routes } from '@/libs/router/constants';

import { useGetPlayer } from '@/domains/casino/player';

import { Page } from '@/components/Page';

import { Aside } from '@/components/Aside';
import { Flex } from '@/shared/Flex';

import { AccountActions } from './AccountActions';
import { AddressBalanceTable } from './AddressBalanceTable';
import { AdminUserActivities } from './AdminUserActivities';
import { Form } from './Form';
import { LatestActivities } from './LatestActivities';
import { Operation } from './Operation';

import * as S from './styles';

export const PlayerForm = memo(() => {
  const { playerId = '' } = useParams();

  const {
    data: player,
  } = useGetPlayer(playerId, {
    enabled: !!playerId,
  });

  return (
    <Page
      breadcrumbs={[
        { content: 'Players', link: routes.PLAYERS_LIST },
        { content: player?.nickname, link: routes.PROMOTIONS },
      ]}
      headTitle={`Player > ${player?.nickname || ''}`}
    >
      <Flex flexDirection="column" gap={18}>
        <S.Container>
          <Flex flexDirection="column" gap={18}>
            <Form key={player?.id} playerId={playerId} />

            <AddressBalanceTable playerId={playerId} />
          </Flex>

          <Aside sticky>
            <AdminUserActivities />

            <AccountActions player={player} />
          </Aside>
        </S.Container>

        {(!playerId) ? (
          <Operation playerId={playerId} />
        ): null}

        <LatestActivities playerId={playerId} />
      </Flex>
    </Page>
  );
});

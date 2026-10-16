import React from 'react';

import { routes } from '@/libs/router/constants';

import { useAppDateFormat } from '@/hooks';
import { useFormatPrice } from '@/domains/currency';
import { useGetWithdrawalDemandDetail } from '@/domains/finance/withdrawals';
import { useParams } from 'react-router-dom';

import { LinkButton } from '@/shared/Button';
import { Card } from '@/shared/Card'
import { Flex } from '@/shared/Flex';
import { LoadingOverlay } from '@/shared/LoadingOverlay';
import { Pill } from '@/shared/Pill';
import { SimpleTable } from '@/shared/SimpleTable';
import { Spacer } from '@/shared/Spacer';
import { Stack, StackItem } from '@/shared/Stack';

import { CryptoIcon } from '@/components/CryptoIcon';
import { Page } from '@/components/Page';
import { Title } from '@/components/Title';

import { LatestActivities } from '@/pages/PlayerForm/LatestActivities';

import { replaceUrlParameters } from '@/utils';

import { USER_STATUSES_TO_COLOR } from '../WithdrawalDemands/constants';

import { WithdrawalDemandDetailTabs } from './WithdrawalDemandDetailTabs';
import WithdrawalDemandDetailHeader from './WithdrawalDemandDetailHeader';

export const WithdrawalDemandDetail: React.FC = () => {
  const { demandId } = useParams<{ demandId: string }>();

  const {
    data,
    isError,
    isLoading,
  } = useGetWithdrawalDemandDetail(demandId);

  const { formatDate } = useAppDateFormat();
  const formatPrice = useFormatPrice()

  const render = () => {
    if (!demandId) {
      return (
        <Card>
          <p>Invalid withdrawal ID. Please check the URL and try again.</p>
        </Card>
      );
    }

    if (isLoading) {
      return (
        <LoadingOverlay />
      );
    }

    if (isError) {
      return (
        <Card>
          Error fetching the Withdrawal Demand. Please try again.
        </Card>
      );
    }

    if (!data) {
      return (
        <Card>
          <span>Withdrawal Demand not found.</span>
        </Card>
      );
    }

    const { demand, player } = data;

    return (
      <>
        <Stack>
          <StackItem
            label="Date"
            value={formatDate(demand.date)}
          />

          <StackItem
            label="Amount"
            value={(
              <Flex alignItems="center" gap={8}>
                <CryptoIcon
                  code={demand.currency}
                  size="l"
                />

                {formatPrice({
                  amount: demand.amount,
                  currency: demand.currency,
                  maximumFractionDigits: demand.amount.split('.')?.[1].length,
                  withoutUnit: true,
                })}
              </Flex>
            )}
          />

          {(demand.refundedAmount) ? (
            <StackItem
              label="Refunded Amount"
              value={(
                <Flex alignItems="center" gap={8}>
                  <CryptoIcon
                    code={demand.currency}
                    size="l"
                  />

                  {formatPrice({
                    amount: demand.refundedAmount,
                    currency: demand.currency,
                    maximumFractionDigits: demand.refundedAmount.split('.')?.[1].length,
                    withoutUnit: true,
                  })}
                </Flex>
              )}
            />
          ) : null}

          <StackItem
            label="Fees"
            value={(
              <Flex alignItems="center" gap={8}>
                <CryptoIcon
                  code={demand.currency}
                  size="l"
                  width={30}
                />

                {formatPrice({
                  amount: demand.fees,
                  currency: demand.currency,
                  maximumFractionDigits: demand.fees.split('.')?.[1].length,
                  withoutUnit: true,
                })}
              </Flex>
            )}
          />

          {(demand.feesRefunded) ? (
            <StackItem
              label="Fees Refunded?"
              value="Yes"
            />
          ) : null}

          <StackItem
            label="Address"
            value={<pre style={{ margin: 0 }}>{demand.walletAddress}</pre>}
          />
        </Stack>

        <Flex justifyContent="space-between" style={{ gap: '1rem' }}>
          <Card style={{ flex: 1 }}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex flexDirection="column">
                <Title >
                  {player.name}
                </Title>

                <pre style={{ margin: 0 }}>{player.username}</pre>
              </Flex>

              <LinkButton color="secondary" href={replaceUrlParameters(routes.EDIT_PLAYER, { playerId: player.id })}>
                User Profile
              </LinkButton>
            </Flex>

            <Spacer size="m" />

            <SimpleTable size="xs">
              <tr>
                <th>Status:</th>
                <td>
                  <Pill color={USER_STATUSES_TO_COLOR[player.status]}>
                    <strong>{player.status}</strong>
                  </Pill>
                </td>
              </tr>

              <tr>
                <th>Email:</th>
                <td>{player.email}</td>
              </tr>

              <tr>
                <th>Registration Date:</th>
                <td>{formatDate(player.registrationDate, { displayFullDate: true })}</td>
              </tr>

              <tr>
                <th>Location:</th>
                <td>{player.address?.city}, {player.address?.country}</td>
              </tr>

              <tr>
                <th>Points:</th>
                <td>{player.points}</td>
              </tr>

              <tr>
                <th>VIP Level:</th>
                <td>{player.vipLevel}</td>
              </tr>

              <tr>
                <th>Tags:</th>
                <td>{player.tags?.join(', ')}</td>
              </tr>
            </SimpleTable>
          </Card>

          <WithdrawalDemandDetailTabs
            reports={demand.reports}
            withdrawalId={player.id}
          />
        </Flex>
        <Spacer size="m" />

        <LatestActivities playerId={player.id} />
      </>
    );
  };

  return (
    <Page
      breadcrumbs={[{
        content: 'Withdrawal Demands',
        link: routes.WITHDRAWALS
      }, {
        content: demandId
      }]}
      headTitle="Withdrawal Detail"
    >
      <WithdrawalDemandDetailHeader data={data} />

      {render()}
    </Page>
  );
};

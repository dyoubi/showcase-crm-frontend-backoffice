import React from 'react';

import { routes } from '@/libs/router/constants';

import { useAppDateFormat } from '@/hooks';
import { useParams } from 'react-router-dom';
import { useGetPaymentMandateDetail } from '@/domains/finance/payments';

import { LinkButton } from '@/shared/Button';
import { Card } from '@/shared/Card'
import { Flex } from '@/shared/Flex';
import { LoadingOverlay } from '@/shared/LoadingOverlay';
import { Pill } from '@/shared/Pill';
import { SimpleTable } from '@/shared/SimpleTable';
import { Spacer } from '@/shared/Spacer';

import { Page } from '@/components/Page';
import { Title } from '@/components/Title';

import { LatestActivities } from '@/pages/PlayerForm/LatestActivities';

import { replaceUrlParameters } from '@/utils';

import { USER_STATUSES_TO_COLOR } from '../WithdrawalDemands/constants';

import { PaymentMandateDetailData } from './PaymentMandateDetailData';
import { PaymentMandateDetailHeader } from './PaymentMandateDetailHeader';
import { PaymentMandateDetailTabs } from './PaymentMandateDetailTabs';

export const PaymentMandateDetail: React.FC = () => {
  const { mandateId } = useParams<{ mandateId: string }>();

  const {
    data,
    isError,
    isLoading,
  } = useGetPaymentMandateDetail(mandateId);

  const { formatDate } = useAppDateFormat();

  const render = () => {
    if (!mandateId) {
      return (
        <Card>
          <span>Invalid payment mandate ID. Please check the URL and try again.</span>
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
          <span>Error fetching the Payment Mandate. Please try again.</span>
        </Card>
      );
    }

    if (!data) {
      return (
        <Card>
          <span>Payment mandate not found.</span>
        </Card>
      );
    }

    const { demand, mandate, player } = data;

    return (
      <>
        <PaymentMandateDetailData
          mandate={mandate}
          demand={demand}
        />

        <Flex justifyContent="space-between" style={{ gap: '1rem' }}>
          <Card style={{ flex: 1 }}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex flexDirection="column">
                <Title>
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

          <PaymentMandateDetailTabs
            reports={demand.reports}
            type={mandate.type}
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
        content: 'Payment Mandates',
        link: routes.PAYMENTS
      }, {
        content: mandateId
      }]}
      headTitle="Payment Detail"
    >
      <PaymentMandateDetailHeader data={data} />

      {render()}
    </Page>
  );
};

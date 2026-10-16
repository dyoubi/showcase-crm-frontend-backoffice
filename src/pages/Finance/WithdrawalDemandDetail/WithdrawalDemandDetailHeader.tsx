import { useState } from 'react';

import { useHandleError, useToaster } from '@/hooks';
import {
  EWithdrawalDemandStatus,
  GetWithdrawalDetailResponse,
  useApproveWithdrawalDemand,
} from '@/domains/finance/withdrawals';

import { Button } from '@/shared/Button';
import { DenyRequestModal, DenyRequestModalTypes } from '@/components/DenyRequestModal';
import { Flex } from '@/shared/Flex';
import { IconLoader } from '@/shared/Icons';
import { Pill } from '@/shared/Pill';

import { WITHDRAWAL_DEMAND_STATUSES_TO_PILL_COLOR } from '../WithdrawalDemands/constants';

interface WithdrawalDemandDetailHeaderProps {
  data?: GetWithdrawalDetailResponse
}

const WithdrawalDemandDetailHeader = (props: WithdrawalDemandDetailHeaderProps) => {
  const { data } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: approveWithdrawal, isLoading: isLoadingApprove } = useApproveWithdrawalDemand({ demandId: data?.demand.id });
  const handleError = useHandleError();
  const toaster = useToaster();

  const handleApproveClick = async () => {
    if (isLoadingApprove) {
      return;
    }

    try {
      await approveWithdrawal();

      setIsModalOpen(false);
      toaster({ content: 'The request has been approved.' });
    } catch (e) {
      handleError(e);
    }
  };

  if (!data) {
    return <h1>Withdrawal Detail</h1>;
  }

  const { demand } = data;

  const render = () => {
    if (EWithdrawalDemandStatus.IN_PROGRESS !== demand.status) {
      return null;
    }

    return (
      <>
        <DenyRequestModal
          currency={demand.currency}
          isModalOpen={isModalOpen}
          requestAmount={Number(demand.amount)}
          requestId={demand.id}
          setIsModalOpen={setIsModalOpen}
          type={DenyRequestModalTypes.EDenyRequest.DEMAND}
        />

        <Flex alignItems="center" gap={18}>
          <Button
            color="success"
            disabled={isLoadingApprove}
            onClick={handleApproveClick}
            rightIcon={(isLoadingApprove) ? IconLoader : undefined}
          >
            Approve
          </Button>

          <Button
            color="danger"
            disabled={isLoadingApprove}
            onClick={() => setIsModalOpen(true)}
          >
            Deny
          </Button>
        </Flex>
      </>
    );
  };

  return (
    <Flex justifyContent="space-between">
      <Flex gap={12}>
        <h1>Withdrawal Detail</h1>

        <Flex alignItems="center">
          <Pill color={WITHDRAWAL_DEMAND_STATUSES_TO_PILL_COLOR[demand.status]}>
            <strong>{demand.status.replaceAll('-', ' ')}</strong>
          </Pill>
        </Flex>
      </Flex>

      {render()}
    </Flex>
  );
};

export default WithdrawalDemandDetailHeader;

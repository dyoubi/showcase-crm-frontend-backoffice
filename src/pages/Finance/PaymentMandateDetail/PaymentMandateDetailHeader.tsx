import { useState } from 'react';

import { useHandleError, useToaster } from '@/hooks';
import {
  EPaymentMandateStatus,
  GetPaymentMandateDetailResponse,
  useSendPaymentMandate,
} from '@/domains/finance/payments';

import { Button } from '@/shared/Button';
import { DenyRequestModal, DenyRequestModalTypes } from '@/components/DenyRequestModal';
import { Flex } from '@/shared/Flex';
import { IconLoader } from '@/shared/Icons';
import { Pill } from '@/shared/Pill';

import { titleCase } from '@/utils';

import { PAYMENT_MANDATE_STATUSES_TO_PILL_COLOR } from '../PaymentMandates/constants';

interface PaymentMandateDetailHeaderProps {
  data?: GetPaymentMandateDetailResponse;
}

export const PaymentMandateDetailHeader = (props: PaymentMandateDetailHeaderProps) => {
  const { data } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: sendPaymentMandate, isLoading: isLoadingSend } = useSendPaymentMandate({ mandateId: data?.mandate.id });
  const handleError = useHandleError();
  const toaster = useToaster();

  const isAMutationLoading = isLoadingSend;

  const handleSendClick = async () => {
    if (isLoadingSend) {
      return;
    }

    try {
      await sendPaymentMandate();

      setIsModalOpen(false);
      toaster({ content: 'Done' });
    } catch (e) {
      handleError(e);
    }
  };

  if (!data) {
    return <h1>Payment Detail</h1>;
  }

  const { mandate } = data;

  const render = () => {
    if (EPaymentMandateStatus.OPEN !== mandate.status) {
      return null;
    }

    return (
      <>
        <DenyRequestModal
          currency={mandate.currency}
          isModalOpen={isModalOpen}
          requestAmount={Number(mandate.amount)}
          requestId={mandate.id}
          setIsModalOpen={setIsModalOpen}
          type={DenyRequestModalTypes.EDenyRequest.MANDATE}
        />

        <Flex alignItems="center" gap={18}>
          <Button
            color="success"
            disabled={isAMutationLoading}
            onClick={handleSendClick}
            rightIcon={(isLoadingSend) ? IconLoader : undefined}
          >
            Send
          </Button>

          <Button
            color="danger"
            disabled={isAMutationLoading}
            onClick={() => setIsModalOpen(true)}
          >
            Cancel
          </Button>
        </Flex>
      </>
    );
  };

  return (
    <Flex justifyContent="space-between">
      <Flex gap={12}>
        <h1>Payment Detail</h1>

        <Flex alignItems="center">
          <Pill color={PAYMENT_MANDATE_STATUSES_TO_PILL_COLOR[mandate.status]}>
            <strong>{titleCase(mandate.status)}</strong>
          </Pill>
        </Flex>
      </Flex>

      {render()}
    </Flex>
  );
};

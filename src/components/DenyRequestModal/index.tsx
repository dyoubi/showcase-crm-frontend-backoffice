import { MouseEventHandler } from 'react';

import { useHandleError, useToaster } from '@/hooks';
import { getInputProps } from '@/libs/react-hook-form/utils';
import { Button } from '@/shared/Button';
import { Checkbox } from '@/shared/Checkbox';
import { Flex } from '@/shared/Flex';
import { IconLoader } from '@/shared/Icons';
import { Input } from '@/shared/Input';
import { Modal } from '@/shared/Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDenyRequestModal, useDenyRequestValidation } from './hooks';
import * as t from './types';

export const DenyRequestModal = (props: t.DenyRequestModalProps) => {
  const {
    currency,
    isModalOpen,
    requestAmount,
    requestId,
    setIsModalOpen,
    type,
  } = props;

  const {
    denyRefundRequest,
    denyVoidAllRequest,
    isLoadingRefund,
    isLoadingVoidAll,
  } = useDenyRequestModal({
    requestId,
    type,
  });
  const handleError = useHandleError();
  const toaster = useToaster();


  const formData = useForm<t.DenyRefundForm>({
    defaultValues: {
      feesRefunded: true,
      refundedAmount: requestAmount,
    },
    resolver: yupResolver(useDenyRequestValidation({
      currency,
      maxAmount: requestAmount,
    })),
  });

  const handleActionClick = <T extends t.DenyRefundForm | void>(mutation: t.MutationType<T>) => async (formValues: T) => {
    if (isLoadingRefund || isLoadingVoidAll) {
      return;
    }

    try {
      await mutation(formValues);

      setIsModalOpen(false);
      toaster({ content: 'Done' });
    } catch (e) {
      handleError(e);
    }
  };

  const { handleSubmit, setValue } = formData;

  return (
    <Modal
      onHide={() => setIsModalOpen(false)}
      show={isModalOpen}
      title="Refund User?"
    >
      <form onSubmit={handleSubmit(handleActionClick<t.DenyRefundForm>(denyRefundRequest as unknown as t.MutationType<t.DenyRefundForm>))}>
        <Flex flexDirection="column" gap={16}>
          <Input
            {...getInputProps(formData, 'refundedAmount')}
            buttonContent="Max"
            buttonProps={{
              onClick: () => setValue('refundedAmount', requestAmount),
            }}
            label={`Refund Amount (${currency})`}
          />

          <Checkbox
            {...getInputProps(formData, 'feesRefunded')}
            label="Refund Fees?"
          />

          <Flex alignItems="center" gap={18}>
            <Button
              color="secondary"
              disabled={isLoadingRefund}
              rightIcon={(isLoadingRefund) ? IconLoader : undefined}
              type="submit"
            >
              Refund User
            </Button>

            <Button
              color="danger"
              disabled={isLoadingVoidAll}
              onClick={handleActionClick<void>(denyVoidAllRequest) as unknown as MouseEventHandler<HTMLButtonElement>}
              rightIcon={(isLoadingVoidAll) ? IconLoader : undefined}
              type="button"
            >
              Hold Funds
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export * as DenyRequestModalTypes from './types'

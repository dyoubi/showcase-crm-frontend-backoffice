import { useQueryClient } from 'react-query';

import { usePostBalanceOperation } from '@/domains/casino/player/balance';
import { QUERY_KEYS } from '@/libs/react-query';
import { useHandleError, useToaster } from '../../../hooks';

import * as t from './types';

export const useHandleForm = () => {
  const { mutateAsync } = usePostBalanceOperation();
  const handleError = useHandleError();
  const toaster = useToaster();
  const queryClient = useQueryClient();

  return async ({ balanceId, amount, operationType }: t.AddOperationForm) => {
    try {
      if (!balanceId || !amount || !operationType) {
        return;
      }

      await mutateAsync({
        balanceId,
        amount,
        type: operationType,
      });
      toaster({ color: 'success', content: 'Operation added' });
      await queryClient.refetchQueries([QUERY_KEYS.GET_PLAYER_BALANCES], { active: true });
      await queryClient.refetchQueries([QUERY_KEYS.GET_BALANCE_OPERATIONS], { active: true });
    } catch (ex) {
      handleError(ex);
    }
  };
};

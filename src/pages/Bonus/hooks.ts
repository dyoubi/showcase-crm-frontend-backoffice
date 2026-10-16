import { UseFormReturn, useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { EBonusType, usePostBonus } from '@/domains/casino/bonus';

import { routes } from '@/libs/router/constants';
import { replaceUrlParameters } from '@/utils';
import { useHandleError, useToaster, useUpdateEffect } from '../../hooks';
import { getPostBonusPayload } from './adapter';
import * as t from './types';

export const useHandleSubmit = (isSameAmountForAllRanks: boolean) => {
  const toaster = useToaster();
  const handleError = useHandleError();
  const { mutateAsync: postBonus } = usePostBonus();
  const navigate = useNavigate();
  const { bonusId } = useParams();

  return async (values: t.BonusForm) => {
    const isNewBonus = bonusId === EBonusType.NEW;

    try {
      const bonus = await postBonus(
        getPostBonusPayload({ values, bonusId, isSameAmountForAllRanks }),
      );
      toaster({ color: 'success', content: isNewBonus ? 'Bonus added' : 'Bonus edited' });

      if (!isNewBonus) {
        return;
      }

      navigate(replaceUrlParameters(routes.BONUS, { bonusId: bonus?.id }));
    } catch (e) {
      handleError(e);
    }
  };
};

// When  the user change the startDate, we must clean endDate for the minDate
export const useCleanEndDate = (formData: UseFormReturn<t.BonusForm>, startDateStr?: string) => {
  const { setValue, getValues } = formData;

  useUpdateEffect(() => {
    const endDateStr = getValues('endDate');

    if (!endDateStr || !startDateStr) {
      return;
    }

    const startDate = new Date(startDateStr);

    const enDate = new Date(endDateStr);

    if (startDate.getTime() < enDate.getTime()) {
      return;
    }

    // if the endDate's value is before the start date we clean it
    setValue('endDate', '');
  }, [startDateStr, setValue]);
};

export const useBonusFormContext = () => useFormContext<t.BonusForm>();

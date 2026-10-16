import { useFormContext, UseFormSetValue } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCurrentCasino } from '@/domains/casino/hooks';
import {
  GetPromotionResponse,
  patchPromotion,
  PatchPromotionPayload,
  usePostPromotion,
} from '@/domains/casino/promotion';
import { patchContentVariant } from '@/domains/casino/content';
import { replaceUrlParameters } from '@/utils';
import { routes } from '@/libs/router/constants';
import { buildPostPayloadFromForm, buildPatchPayloadFromForm } from './adapter';

import { useHandleError, useToaster, useUpdateEffect } from '../../hooks';
import * as t from './types';

export const usePromotionForm = () => useFormContext<t.PromotionForm>();

// When  the user change the startDate, we must clean endDate for the minDate
export const useCleanEndDate = (setValue: UseFormSetValue<t.PromotionForm>, startDate?: string) => {
  useUpdateEffect(() => {
    setValue('endDate', '');
  }, [startDate, setValue]);
};

interface UseOnFormSubmitParams {
  promotion?: GetPromotionResponse;
}

export const useOnFormSubmit = ({ promotion }: UseOnFormSubmitParams) => {
  const { id: casinoId } = useCurrentCasino();
  const { mutateAsync: postPromotion, isLoading } = usePostPromotion();
  const navigate = useNavigate();
  const handleError = useHandleError();
  const toaster = useToaster();

  const isEditing = !!promotion?.id;
  const promises: Array<Promise<ReturnType<typeof patchContentVariant>>> = [];

  const save = async (values: t.PromotionForm) => {
    try {
      if (!isEditing) {
        const { id } = await postPromotion(buildPostPayloadFromForm(casinoId, values));
        toaster({ content: 'Promotion created' });
        navigate(replaceUrlParameters(routes.PROMOTION, { promotionId: id }));
        return;
      }

      const payload: PatchPromotionPayload = {
        key: values.slug,
      };
      if (values.startDate) {
        payload.startDate = values.startDate;
      }

      if (values.endDate) {
        payload.endDate = values.endDate;
      }

      await patchPromotion(casinoId, promotion.id, payload);

      const payloads = buildPatchPayloadFromForm(values);
      payloads.forEach(({ contentId, data, id }) =>
        promises.push(patchContentVariant(casinoId, contentId || '', id || '', { data })),
      );

      await Promise.all(promises);

      toaster({ content: 'Promotion edited' });
    } catch (e) {
      handleError(e);
    }
  };
  return { save, isLoading };
};

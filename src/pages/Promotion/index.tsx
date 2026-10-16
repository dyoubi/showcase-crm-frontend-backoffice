import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '@/components/Page';
import { PromotionForm } from '@/components/PromotionForm';
import { useGetPromotion, usePatchPromotion } from '@/domains/casino/promotion';
import { Spacer } from '@/shared/Spacer';

import { EditableTitle } from '@/shared/EditableTitle';

import { routes } from '@/libs/router/constants';

export const Promotion = memo(() => {
  // hooks
  const params = useParams();
  const { promotionId = 'new' } = params;
  const isNewPromotion = promotionId === 'new';
  const { data: promotion, refetch } = useGetPromotion(promotionId, {
    enabled: !isNewPromotion,
  });
  const patchRequest = usePatchPromotion();

  const onTitleSave = async (name: string) => {
    await patchRequest.mutateAsync({ id: promotionId, name });
    await refetch();
  };

  return (
    <Page
      breadcrumbs={[
        { content: 'Promotions', link: routes.PROMOTIONS },
        { content: promotion?.name || 'Untitled', link: routes.PROMOTIONS },
      ]}
      headTitle={`Promotion > ${promotion?.name || ''}`}
    >
      {!isNewPromotion && <EditableTitle value={promotion?.name} onSave={onTitleSave} />}
      <Spacer size="l" />
      <PromotionForm key={promotion?.id} promotion={promotion} isNewPromotion={isNewPromotion} />
    </Page>
  );
});

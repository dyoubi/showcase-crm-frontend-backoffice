import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePatchCarousel, usePostCarousel } from '@/domains/casino/carousel';
import { replaceUrlParameters } from '@/utils';

import { routes } from '@/libs/router/constants';
import { useHandleError, useToaster } from '../../hooks';
import * as c from './constants';

interface PromotionList {
  id: string;
  slug?: string;
  redirection?: string;
  duration?: number;
}

interface SaveCarouselPayload {
  name?: string;
  items: ReadonlyArray<PromotionList>;
  id?: string;
}

export const usePromotionsListState = () => {
  return useState<Array<PromotionList>>([]);
};

export const useSaveCarousel = <C>(reFetchCarousel: () => Promise<C>) => {
  const postCarousel = usePostCarousel();
  const patchCarousel = usePatchCarousel();
  const toaster = useToaster();
  const navigate = useNavigate();
  const handleError = useHandleError();


  const save = async ({ id, items = [], name = '' }: SaveCarouselPayload) => {
    try {
      const payload = items.map((item, index) => ({
        priority: index,
        contentId: item.id,
        duration: item.duration || 300,
        promotionSlug: item.id || '', // Ensure promotionSlug is included
        redirection: item.redirection || '',
        promotionId: item.id, // Add this line
      }));

      if (!id || id === c.NEW_CAROUSEL_BANNER_ID) {
        const newCarousel = await postCarousel.mutateAsync({ key: name, items: payload });
        toaster({ content: 'Carousel created' });

        navigate(replaceUrlParameters(routes.CAROUSEL, { carouselId: newCarousel.id }));
        return;
      }

      await patchCarousel.mutateAsync({ key: name, id, items: payload });
      await reFetchCarousel();
      toaster({ content: 'Carousel edited' });
    } catch (e) {
      handleError(e);
    }
  };

  return {
    isFetching: postCarousel.isLoading || patchCarousel.isLoading,
    save,
  };
};

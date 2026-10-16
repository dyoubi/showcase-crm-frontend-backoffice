import { memo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { useParams } from 'react-router-dom';

import { Page } from '@/components/Page';
import { useGetPromotions } from '@/domains/casino/promotion';
import { useGetCarrousel } from '@/domains/casino/carousel';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { Card } from '@/shared/Card';
import { Button } from '@/shared/Button';
import { IconList, IconShuffle } from '@/shared/Icons';
import { EditableTitle } from '@/shared/EditableTitle';

import { routes } from '@/libs/router/constants';
import { usePromotionsListState, useSaveCarousel } from './hooks';
import { PromotionThumbnail } from './PromotionThumbnail';
import { BannerItem } from './BannerItem';
import * as c from './constants';

export const Carousel = memo(() => {
  const { carouselId = c.NEW_CAROUSEL_BANNER_ID } = useParams();
  const isNewCarousel = carouselId === c.NEW_CAROUSEL_BANNER_ID;
  const [promotionsList, setPromotionsList] = usePromotionsListState();
  const [bannerList, setBannerList] = usePromotionsListState();

  useGetPromotions(undefined, {
    onSuccess: (promotions) => {
      setPromotionsList(
        (promotions || []).map((promotion) => ({
          id: promotion?.bannerId,
          name: promotion?.name || promotion?.key,
          slug: promotion?.slug,
        })),
      );
    },
  });

  const { data: carousel, refetch: reFetchCarousel } = useGetCarrousel(carouselId, {
    enabled: !isNewCarousel,
    onSuccess: (carouselResponse) => {
      setBannerList(
        (carouselResponse?.items || []).map((item) => ({
          id: item.contentId,
          slug: item?.promotionSlug,
          duration: item?.duration,
        })),
      );
    },
  });

  const { save, isFetching } = useSaveCarousel(reFetchCarousel);
  const editNameRequest = useSaveCarousel(reFetchCarousel);

  const promotionsToDisplay = promotionsList.filter((promotion) => {
    return !bannerList.find((item) => item.id === promotion.id);
  });

  return (
    <Page
      style={{ height: '100%' }}
      breadcrumbs={[
        {
          content: 'Carousels',
          link: routes.CAROUSELS,
        },
        {
          content: carousel?.key || 'Untitled',
        },
      ]}
      headTitle={`Carousel > ${carousel?.key || ''}`}
    >
      <EditableTitle
        value={carousel?.key}
        onSave={(newName) =>
          editNameRequest.save({ id: carouselId, name: newName, items: bannerList })
        }
      />
      <Spacer size="l" />
      <Flex>
        <div>
          <Card icon={IconList} title="Promotions list" style={{ position: 'sticky', top: 12 }}>
            <ReactSortable
              list={promotionsToDisplay}
              setList={setPromotionsList}
              group={c.SORTABLE_GROUP_ID}
              style={{ width: 300 }}
            >
              {promotionsToDisplay?.map((promotion) => (
                <PromotionThumbnail key={promotion?.id} bannerId={promotion?.id} promotionId={promotion.id} />
              ))}
            </ReactSortable>
          </Card>
        </div>
        <Spacer size="l" />
        <Card
          icon={IconShuffle}
          title="Order"
          topContent={
            <Button
              color="success"
              onClick={() => save({ id: carouselId, items: bannerList, name: carousel?.key })}
            >
              Save
            </Button>
          }
          loadingOverlay={isFetching}
          style={{ minHeight: 325, flex: 1 }}
        >
          <ReactSortable
            list={bannerList}
            setList={setBannerList}
            group={c.SORTABLE_GROUP_ID}
            style={{ height: '100%' }}
          >
            {bannerList.map(({ id }) => (
              <BannerItem key={id} contentId={id} />
            ))}
          </ReactSortable>
        </Card>
      </Flex>
    </Page>
  );
});

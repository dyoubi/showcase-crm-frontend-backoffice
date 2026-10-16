import { forwardRef, ReactNode } from 'react';
import { ReactSortable } from 'react-sortablejs';
import cloneDeep from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';

import {
  useGetCategoryMachinesViews,
  GetCategoryResponse,
  useDeleteMachineViewInCategory,
  usePatchMachineViewCategoryPosition,
} from '@/domains/casino/category';
import { GameThumbnailWithButtons } from '@/components/GameThumbnailWithButtons';
import { IconGamepad } from '@/shared/Icons';
import { Card } from '@/shared/Card';

import { Spacer } from '@/shared/Spacer';
import { Flex } from '@/shared/Flex';
import { DATA_TEST_IDS } from '@/constants';
import { useHandleError } from '../../../hooks';

import { AddGamesCard } from '../AddGamesModal';
import * as c from './constants';
import * as S from './styles';

// This is just like a normal component, but now has a ref.
const WrapperDragNDrop = forwardRef<HTMLDivElement, { children?: ReactNode }>((props, ref) => (
  <S.WrapperDragNDrop ref={ref}>{props.children}</S.WrapperDragNDrop>
));

interface ChangeGamesOrderProps {
  categoryId: string;
  category: GetCategoryResponse;
}

export const ChangeGamesOrder = ({ category, categoryId }: ChangeGamesOrderProps) => {
  const {
    data: categoryMachines,
    refetch,
    isLoading: isLoadingMachineViewList,
  } = useGetCategoryMachinesViews(category.id);
  const handleError = useHandleError();
  const { mutateAsync: deleteMachineViewInCategory, isLoading: loadingDelete } =
    useDeleteMachineViewInCategory();
  const { mutateAsync: patchMachineViewCategoryPosition, isLoading: loadingPatch } =
    usePatchMachineViewCategoryPosition();

  return (
    <Flex flexDirection="row" flexShrink={0}>
      <Card
        icon={IconGamepad}
        loadingOverlay={isLoadingMachineViewList || loadingDelete || loadingPatch}
        style={{ flex: 1 }}
        title="Games order :"
      >
        <ReactSortable
          animation={250}
          tag={WrapperDragNDrop}
          list={cloneDeep(categoryMachines || [])}
          setList={() => 0}
          onEnd={async ({ oldIndex, newIndex }) => {
            if (isNil(oldIndex) || isNil(newIndex)) {
              return;
            }
            const movedMachineView = categoryMachines?.[oldIndex];

            await patchMachineViewCategoryPosition({
              categoryMachineId: movedMachineView?.categoryMachine || '',
              position: newIndex + 1,
            });
            await refetch();
          }}
          swapThreshold={1}
        >
          {categoryMachines?.map((item) => (
            <GameThumbnailWithButtons
              isGrabbing
              key={`${item.position}-${item.id}`}
              className={c.CLASSNAMES.GAME_THUMBNAIL}
              image={item?.image?.desktop?.url}
              provider={item?.provider}
              title={item?.title}
              position={item?.position}
              data-testid={DATA_TEST_IDS.GAME_CATEGORY_ITEM}
              data-game-id={item.id}
              data-game-title={item.title}
              data-game-slug={item.key}
              data-game-position={item.position}
              onRemove={async () => {
                try {
                  await deleteMachineViewInCategory(item.categoryMachine);
                  await refetch();
                } catch (ex) {
                  handleError(ex);
                }
              }}
              onSwapPositionIndex={async (newPositionIndex) => {
                await patchMachineViewCategoryPosition({
                  categoryMachineId: item.categoryMachine,
                  position: newPositionIndex,
                });
                await refetch();
              }}
            />
          ))}
        </ReactSortable>
      </Card>
      <Spacer size="m" />
      <AddGamesCard
        categoryId={categoryId}
        // @ts-ignore
        categoryGames={categoryMachines}
        refetch={refetch}
      />
    </Flex>
  );
};

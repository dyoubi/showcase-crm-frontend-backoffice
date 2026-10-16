import { useState } from 'react';

import { MachineView, useGetMachinesViews } from '@/domains/casino/machineView';
import { usePostMachineViewToCategory } from '@/domains/casino/category';

import { GameThumbnailWithButtons } from '@/components/GameThumbnailWithButtons';
import { pluralize, removeItemFromId } from '@/utils';
import { Select, OptionType } from '@/shared/Select';
import { IconAddPlus, IconGamepad } from '@/shared/Icons';
import { Button } from '@/shared/Button';
import { Card } from '@/shared/Card';

import { Spacer } from '@/shared/Spacer';
import { Flex } from '@/shared/Flex';

import { DATA_TEST_IDS } from '@/constants';
import { getOptions } from './logic.helper';

interface AddGamesCardProps<C> {
  categoryGames?: Array<MachineView>;
  categoryId: string;
  refetch: () => Promise<C>;
}

export const AddGamesCard = <C,>({ categoryGames, categoryId, refetch }: AddGamesCardProps<C>) => {
  // hooks
  const { data: machinesViews = [] } = useGetMachinesViews();
  const [selectedGames, setSelectedGames] = useState<Array<MachineView>>([]);
  const gameText = pluralize('game', selectedGames);
  const { mutateAsync } = usePostMachineViewToCategory();

  // callbacks
  const addGame = (newOption: OptionType | null) => {
    const newGame = machinesViews?.find((machineView) => machineView.id === newOption?.value);
    if (!newGame) {
      return;
    }
    setSelectedGames([...selectedGames, newGame]);
  };

  const removeGame = (id: string) => setSelectedGames(removeItemFromId(selectedGames, id));

  const addNewGames = async () => {
    const promisesList: Array<Promise<void>> = [];

    selectedGames.forEach((machineView) => {
      promisesList.push(
        mutateAsync({
          categoryId,
          machineViewId: machineView.id,
        }),
      );
    });

    await Promise.all(promisesList);
    await refetch();
    // we clear the selectedGames
    setSelectedGames([]);
  };

  // constants
  const gameOptions = getOptions({
    availableMachinesViews: machinesViews,
    selectedMachinesViews: selectedGames,
    categoryMachinesViews: categoryGames,
  });

  return (
    <div style={{ width: 410 }}>
      <Card icon={IconGamepad} title={`Add new ${gameText}`} style={{ position: 'sticky', top: 8 }}>
        <Flex flexDirection="row">
          <Select
            data-testid={DATA_TEST_IDS.GAMES_TO_ADD_TO_CATEGORY_SELECT}
            style={{ flex: 1 }}
            onChange={addGame}
            options={gameOptions}
          />
          <Spacer size="xxs" />
          <Button
            width={157}
            type="button"
            data-testid={DATA_TEST_IDS.ADD_GAMES_TO_CATEGORY_BUTTON}
            leftIcon={IconAddPlus}
            onClick={addNewGames}
            disabled={selectedGames?.length < 1}
          >
            Add {selectedGames?.length} {gameText}
          </Button>
        </Flex>
        <Spacer size="xs" />
        {selectedGames.map((g) => (
          <GameThumbnailWithButtons
            {...g}
            key={g.id}
            image={g?.image?.desktop?.url}
            onRemove={() => removeGame(g.id)}
          />
        ))}
      </Card>
    </div>
  );
};

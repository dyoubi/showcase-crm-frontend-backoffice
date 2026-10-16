import { MachineView } from '@/domains/casino/machineView';

interface GetOptions {
  availableMachinesViews?: Array<MachineView>;
  categoryMachinesViews?: Array<MachineView>;
  selectedMachinesViews?: Array<MachineView>;
}

export const getOptions = ({
  availableMachinesViews = [],
  categoryMachinesViews = [],
  selectedMachinesViews = [],
}: GetOptions) => {
  const newAvailableGames = [...availableMachinesViews];

  return newAvailableGames
    .filter((availableGame) => {
      const alreadyInCategory = !!categoryMachinesViews?.find(
        (categoryGame) => categoryGame.id === availableGame.id,
      );
      const alreadySelected = !!selectedMachinesViews.find(
        (selectedGame) => selectedGame.id === availableGame.id,
      );

      // if the game is already in the current category,
      // or was already add by the user
      // we remove it from the options list
      return !(alreadyInCategory || alreadySelected);
    })
    .map((machineView) => ({
      value: machineView.id,
      label: machineView.title,
    }));
};

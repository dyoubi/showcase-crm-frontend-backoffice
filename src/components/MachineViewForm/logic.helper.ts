import { GetCasinoMachinesResponse, Machine } from '@/domains/casino/machine';
import { GetCasinoMachinesViewsResponse } from '@/domains/casino/machineView';

export const getMachinesOptions = ({
  machines,
  machinesViews,
}: {
  machines: GetCasinoMachinesResponse;
  machinesViews: GetCasinoMachinesViewsResponse;
}) => {
  const machinesOptions = machines.map((machine) => ({
    label: machine?.info?.title,
    value: machine?.id,
  }));

  return machinesOptions.filter((machine) => {
    // we filter all the option that the user already integrated
    return !machinesViews.find((machineView) => machineView.operatorId === machine.value);
  });
};

export const findMachineFromId = (id?: string, machinesList?: ReadonlyArray<Machine>) =>
  machinesList?.find((machine) => machine?.id === id);

import { memo, useState } from 'react';

import { Page } from '@/components/Page';
import { MachineView } from '@/domains/casino/machineView';
import { SectionTitle } from '@/shared/SectionTitle';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { routes } from '@/libs/router/constants';

import { MachinesViewsList } from './MachinesViewsList';
import { EditMachineView } from './EditMachineView';

export const MachinesViews = memo(() => {
  const [machineViewEdit, setMachineViewEdit] = useState<MachineView>();

  return (
    <Page breadcrumbs={[{ content: 'Games list', link: routes.GAMES_LIST }]} headTitle="Games">
      <SectionTitle>Games list :</SectionTitle>
      <Flex flexDirection="row">
        <MachinesViewsList setMachineViewEdit={setMachineViewEdit} />
        <Spacer size="xs" />
        <EditMachineView
          key={machineViewEdit?.id || ''}
          machineViewToEdit={machineViewEdit}
          setMachineViewEdit={setMachineViewEdit}
        />
      </Flex>
    </Page>
  );
});

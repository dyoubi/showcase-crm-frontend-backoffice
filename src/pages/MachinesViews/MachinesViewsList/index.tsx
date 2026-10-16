import { memo, useCallback, useMemo, useState, Fragment } from 'react';

import {
  useGetMachinesViews,
  useDeleteMachineView,
  MachineView,
} from '@/domains/casino/machineView';

import { Card } from '@/shared/Card';
import { Table } from '@/shared/Table';
import { Badge } from '@/shared/Badge';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';
import { Select } from '@/shared/Select';
import { Input } from '@/shared/Input';
import { IconAddPlus, IconEdit, IconSearch, IconTrash, IconFilter } from '@/shared/Icons';

import { DATA_TEST_IDS } from '@/constants';
import { useConfirmDeleteItem, useDebouncedValue } from '../../../hooks';

import { AddMachineViewModal } from './AddMachineViewModal';
import * as S from './styles';

interface MachinesViewsListProps {
  setMachineViewEdit: (game: MachineView | undefined) => void;
}

export const MachinesViewsList = memo(({ setMachineViewEdit }: MachinesViewsListProps) => {
  const [searchTerm, setSearchTerm] = useDebouncedValue('');
  const { data: machinesViews, refetch, isFetching } = useGetMachinesViews(searchTerm);
  const [displayAddMachineViewModal, setDisplayAddMachineViewModal] = useState(false);
  const confirmDeleteItem = useConfirmDeleteItem();
  const { mutateAsync: deleteMachineView } = useDeleteMachineView();

  // callbacks
  const onHideModal = useCallback(() => {
    setDisplayAddMachineViewModal(false);
  }, [setDisplayAddMachineViewModal]);

  const onDisplayModal = useCallback(() => {
    setDisplayAddMachineViewModal(true);
  }, [setDisplayAddMachineViewModal]);

  const onMachineViewAdd = useCallback(() => {
    refetch().finally(() => onHideModal());
  }, [onHideModal, refetch]);

  return (
    <Flex flex={1} flexDirection="column">
      {displayAddMachineViewModal && (
        <AddMachineViewModal onHide={onHideModal} onMachineViewAdd={onMachineViewAdd} />
      )}
      <Card>
        <Flex flexDirection="row" width="100%">
          <Input
            flex={1}
            leftIcon={IconSearch}
            onChange={({ target: { value } }) => setSearchTerm(value)}
            data-testid={DATA_TEST_IDS.SEARCH_GAME_INPUT}
            buttonContent="Add New Game"
            buttonProps={useMemo(
              () => ({
                'data-testid': DATA_TEST_IDS.ADD_NEW_GAME_BUTTON,
                leftIcon: IconAddPlus,
                onClick: onDisplayModal,
              }),
              [onDisplayModal],
            )}
          />
        </Flex>
        <Spacer size="xs" />
        <Flex alignItems="center" flexDirection="row">
          <IconFilter size="l" />
          <Spacer size="m" />
          <Select placeholder="Providers" options={[]} />
        </Flex>
      </Card>
      <Spacer size="xs" />
      <Card loadingOverlay={isFetching}>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody data-testid={DATA_TEST_IDS.GAMES_LIST}>
            {machinesViews?.map((machineView) => (
              <tr key={machineView.id}>
                <td>{machineView.title}</td>
                <td>
                  <S.DescriptionContainer>{machineView.description}</S.DescriptionContainer>
                </td>
                <td>
                  <Flex
                    flexDirection="row"
                    flexWrap="wrap"
                    flex={1}
                    justifyContent="center"
                    style={{ margin: '0 auto' }}
                  >
                    {machineView?.tags?.map((tag) => (
                      <Fragment key={tag.id}>
                        <Badge color={tag?.color}>{tag.name}</Badge>
                        <Spacer size="xxs" />
                      </Fragment>
                    ))}
                  </Flex>
                </td>
                <td>
                  <IconEdit
                    style={{ cursor: 'pointer' }}
                    onClick={() => setMachineViewEdit(machineView)}
                  />
                  &nbsp;&nbsp;
                  <IconTrash
                    style={{ cursor: 'pointer' }}
                    color="danger"
                    data-testid={DATA_TEST_IDS.REMOVE_GAME_BUTTON}
                    onClick={() =>
                      confirmDeleteItem({
                        type: 'game',
                        name: machineView?.title,
                        onConfirm: async () => {
                          await deleteMachineView(machineView.id);
                          await refetch();
                        },
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Flex>
  );
});

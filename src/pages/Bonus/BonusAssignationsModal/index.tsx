/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDeleteBonusAssignation, useGetBonusAssignations } from '@/domains/casino/bonus';
import { Flex } from '@/shared/Flex';

import { Button } from '@/shared/Button';

import { IconRotate, IconTrash } from '@/shared/Icons';
import { Modal } from '@/shared/Modal';
import { Table } from '@/shared/Table';
import { useAppDateFormat, useConfirmDeleteItem } from '../../../hooks';

interface BonusAssignationsModalProps {
  bonusId: string;
  onClose: () => void;
}

export const BonusAssignationsModal = ({ bonusId, onClose }: BonusAssignationsModalProps) => {
  const { formatDate } = useAppDateFormat();
  const confirmDeleteItem = useConfirmDeleteItem();

  const {
    data: bonusAssignations,
    isError: isErrorBonusAssignations,
    isLoading: isLoadingBonusAssignations,
    refetch: refetchAssignations,
  } = useGetBonusAssignations(bonusId);

  const { mutateAsync: deleteBonusAssignation } = useDeleteBonusAssignation();

  const render = () => {
    if (isLoadingBonusAssignations) {
      return (
        <tr>
          <td colSpan={4} style={{ textAlign: 'center' }}>
            Loading...
          </td>
        </tr>
      );
    }

    if (isErrorBonusAssignations) {
      return (
        <tr>
          <td colSpan={4} style={{ textAlign: 'center' }}>
            Error loading bonuses. Please try refreshing the page.
          </td>
        </tr>
      );
    }

    if (!bonusAssignations?.length) {
      return (
        <tr>
          <td colSpan={4} style={{ textAlign: 'center' }}>
            This bonus has not been assigned yet.
          </td>
        </tr>
      );
    }

    return (
      bonusAssignations.map((assignation) => (
        <tr key={assignation.id}>
          <td>{assignation.player?.nickname}</td>
          <td>{assignation.player?.email}</td>
          <td>{assignation.receivedAt ? formatDate(assignation.receivedAt) : '—'}</td>

          <td>
            <Button
            color="danger"
            onClick={() =>
                confirmDeleteItem({
                  name: `assignation to player ${assignation.player?.nickname}`,
                  onConfirm: async () => {
                    await deleteBonusAssignation({
                      assignationId: assignation.id,
                      bonusId: assignation.bonusId,
                    });
                    await refetchAssignations();
                  },
                })
              }
            >
              <IconTrash />
            </Button>
          </td>
        </tr>
    )));
  };

  return (
    <Modal
      onHide={onClose}
      title="Assigned Players"
      show
    >
      <Flex flexDirection="column" gap={32}>
        <Table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Claimed at</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {render()}
          </tbody>
        </Table>

        <Flex justifyContent="flex-end">
          <Button
            disabled={isLoadingBonusAssignations}
            leftIcon={IconRotate}
            onClick={() => refetchAssignations()}
            type="button"
          >
            Reload
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

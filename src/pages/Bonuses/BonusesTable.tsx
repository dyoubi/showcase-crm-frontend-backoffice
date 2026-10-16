import { Dispatch, SetStateAction } from 'react';
import { routes } from '@/libs/router/constants';

import { Bonus, useDeleteBonus } from '@/domains/casino/bonus';

import { useAppDateFormat, useConfirmDeleteItem, useHandleError, useToaster } from '@/hooks';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';
import { IconEdit, IconShoppingCart, IconTrash } from '@/shared/Icons';
import { Table } from '@/shared/Table';
import { Tooltip } from '@/shared/Tooltip';
import { replaceUrlParameters } from '@/utils';

export interface BonusesTableProps {
  data?: Bonus[];
  isError?: boolean;
  isLoading?: boolean;
  setSelectedBonus: Dispatch<SetStateAction<Bonus | null>>;
};

const BonusesTable = (props: BonusesTableProps) => {
  const {
    data,
    isError,
    isLoading,
    setSelectedBonus,
  } = props;

  const { formatDate } = useAppDateFormat();
  const confirmDeleteItem = useConfirmDeleteItem();
  const handleError = useHandleError();
  const navigate = useNavigate();
  const toaster = useToaster();

  const { mutateAsync: deleteBonus } = useDeleteBonus();

  const handleDeleteBonus = async (bonusId: string) => {
    try {
      if (!bonusId || isLoading) {
        return;
      }

      await deleteBonus(bonusId);

      toaster({
        content: 'Bonus deleted successfully.',
        color: 'success',
      });
    } catch (error) {
      handleError(error);
    }
  };

  const render = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={7} style={{ textAlign: 'center' }}>
            Loading...
          </td>
        </tr>
      );
    }

    if (isError) {
      return (
        <tr>
          <td colSpan={7} style={{ textAlign: 'center' }}>
            Error loading bonuses. Please try refreshing the page.
          </td>
        </tr>
      );
    }

    if (!data?.length) {
      return (
        <tr>
          <td colSpan={7} style={{ textAlign: 'center' }}>
            No available bonuses. Try adjusting the filters.
          </td>
        </tr>
      );
    }

    return data.map((bonus) => (
      <tr key={bonus.id}>
        <td>{bonus.code}</td>
        <td>{bonus.name}</td>
        <td>{bonus.description}</td>
        <td>{bonus.type}</td>
        <td>{formatDate(bonus.startAt, { displayFullDate: true })}</td>
        <td>{formatDate(bonus.endAt, { displayFullDate: true })}</td>

        <td>
          <Flex gap={16}>
            <Tooltip placement="top" message="Assign">
              <Button
                color="secondary"
                onClick={() => setSelectedBonus(bonus)}
              >
                <IconShoppingCart size="m" />
              </Button>
            </Tooltip>

            <Tooltip placement="top" message="Edit">
              <Button
                color="secondary"
                onClick={() => navigate(replaceUrlParameters(routes.BONUS, { bonusId: bonus.id }))}
              >
                <IconEdit size="m" />
              </Button>
            </Tooltip>

            <Tooltip placement="top" message="Delete">
              <Button
                color="danger"
                onClick={() => confirmDeleteItem({
                  type: 'bonus',
                  name: `${bonus.name} (${bonus.code})`,
                  onConfirm: async () => handleDeleteBonus(bonus.id),
                })}
              >
                <IconTrash size="m" />
              </Button>
            </Tooltip>
        </Flex>
        </td>
      </tr>
    ));
  }

  return (
    <Table overflow zebra>
      <thead style={{ textAlign: 'left' }}>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Start At</th>
          <th>End At</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody style={{ textAlign: 'left' }}>
        {render()}
      </tbody>
    </Table>
  );
};

export default BonusesTable;

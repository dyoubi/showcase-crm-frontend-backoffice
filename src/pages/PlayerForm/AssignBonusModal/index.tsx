import { useForm } from 'react-hook-form';
import { getInputProps } from '@/libs/react-hook-form/utils';

import { useAppDateFormat, useHandleError, useToaster } from '@/hooks';
import { EBonusType, useAssignBonusByPlayerId, useGetAssignedPlayerBonus, useGetBonuses } from '@/domains/casino/bonus';

import { PlayerWithBonuses } from '@/domains/casino/player';

import { Button } from '@/shared/Button';
import { Checkbox } from '@/shared/Checkbox';
import { IconCash, IconInfoCircle, IconLoader } from '@/shared/Icons';
import { Modal } from '@/shared/Modal';
import { Flex } from '@/shared/Flex';
import { TimeLine } from '@/shared/TimeLine';
import { LoadingOverlay } from '@/shared/LoadingOverlay';

import * as t from './types';

interface AssignBonusModalProps {
  player: PlayerWithBonuses;
  onHide: () => void;
}

export const AssignBonusModal = ({ player, onHide }: AssignBonusModalProps) => {
  const currentDate = new Date();

  // hooks
  const { formatDate } = useAppDateFormat();

  const {
    mutateAsync: postAssignBonus ,
    isLoading: isBonusAssignLoading,
  } = useAssignBonusByPlayerId({ playerId: player.id });

  const {
    data: activeBonuses,
    isLoading: isActiveBonusesLoading,
  } = useGetBonuses({
    filter: {
      where: {
        active: true, // This flag is not doing anything
        ...((player.bonuses) ? { id: { nin: player.bonuses.map(({ id }) => id) }, } : {}),
        type: { neq: EBonusType.AUTO },
        startAt: { lte: currentDate },
        endAt: { gte: currentDate }
      },
    },
  });

  const {
    data: assignedBonuses,
    isLoading: isAssignedBonusesLoading,
  } = useGetAssignedPlayerBonus({
    playerId: player.id,
    filter: { include: ['bonus'] }
  });


  const toaster = useToaster();
  const handleError = useHandleError();
  const formData = useForm<t.AssignBonusForm>();

  // constants
  const { getValues } = formData;
  const playerId = player?.id;
  const availableBonuses = activeBonuses?.activeBonuses;

  // callbacks
  const assignBonuses = async () => {
    try {
      const { bonusesId = [] } = getValues();
      const pickedBonusesId = bonusesId.filter((bonus) => !!bonus);
      const pending: Array<ReturnType<typeof postAssignBonus>> = [];

      if (!playerId) return;

      for (let i = 0; i < pickedBonusesId.length; i += 1) {
        pending.push(postAssignBonus({ bonusId: pickedBonusesId[i] }));
      }

      await Promise.all(pending);
      toaster({ content: 'Bonus sent to the player', color: 'success' });

      // Hide modal to refresh UI
      onHide();
    } catch (ex) {
      handleError(ex);
    }
  };

  const render = () => {
    if (isActiveBonusesLoading || isAssignedBonusesLoading) {
      return <LoadingOverlay />;
    }

    if (!availableBonuses?.length) {
      return (
        <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={8}
        >
          <IconInfoCircle size="l" />

          <p>No bonuses are available to be assigned.</p>
        </Flex>
      );
    }

    return (
      <>
        <div>
          {availableBonuses.map((bonus, index) => (
            <Checkbox
              {...getInputProps(formData, `bonusesId.${index}`)}
              key={bonus?.id}
              defaultValue={bonus?.id}
              label={bonus?.code}
            />
          ))}
        </div>

        <Button onClick={assignBonuses} disabled={isBonusAssignLoading}>
          Assign Selected Bonuses

          {(isBonusAssignLoading) ? (
            <IconLoader style={{ paddingLeft: 8 }} />
          ) : null}
        </Button>
      </>
    );
  };

  return (
    <Modal icon={IconCash} title="Assign Bonus" show onHide={onHide}>
      <Flex flexDirection="row">
        <Flex flex={1}>
          <Flex
            flex={1}
            flexDirection="column"
            alignItems="flex-start"
            gap={16}
          >
            <h3 style={{ margin: 0 }}>
              Bonuses Available
            </h3>

            {render()}
          </Flex>
        </Flex>

        <div style={{ width: 250 }}>
          <h3 style={{ margin: 0 }}>
            Bonuses Assigned
          </h3>

          {(assignedBonuses?.length) ? (
            <TimeLine
              items={assignedBonuses?.map((assignedBonus) => ({
                date: formatDate(assignedBonus.createdAt),
                title: assignedBonus.bonus.code,
                content: assignedBonus.bonus.description,
              }))}
            />
          ) : (
            <p>No bonuses have been assigned yet.</p>
          )}
        </div>
      </Flex>
    </Modal>
  );
};

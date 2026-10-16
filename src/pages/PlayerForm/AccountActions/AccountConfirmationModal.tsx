import { useState } from 'react';

import { usePatchActivatePlayer, usePatchBanPlayer, usePatchFreezePlayer } from '@/domains/casino/player';
import { useHandleError, useToaster } from '@/hooks';

import { Button } from '@/shared/Button';
import { getOptionFromValue, Select } from '@/shared/Select';
import { Flex } from '@/shared/Flex';
import { IconLoader } from '@/shared/Icons';
import { Modal } from '@/shared/Modal';

import { getBeginAndEndDates } from '@/domains/account/dateFormat';

import { useConfirmAction } from './hooks';

import * as c from './constants';
import * as S from './styles';
import * as t from './types';

const DESCRIPTION_COPY: Record<t.AccountActions, JSX.Element> = {
  [t.EAccountActions.ACTIVATE]: (
    <p>
      Are you sure you want to <strong>activate</strong> this player?
    </p>
  ),
  [t.EAccountActions.BAN]: (
    <p>
      Are you sure you want to <strong>permanently ban</strong> this player?
    </p>
  ),
  [t.EAccountActions.FREEZE]: (
    <p>
      Please select the frozen time duration.
    </p>
  ),
};

export const AccountConfirmationModal = (props: t.AccountConfirmationModalProps) => {
  const {
    confirmationType,
    playerId,
    setConfirmationType,
  } = props;

  const [frozenUntil, setFrozenUntil] = useState<number>(c.SELECTION_OPTIONS[0].value);

  const confirmAction = useConfirmAction();
  const handleError = useHandleError();
  const toaster = useToaster();

  const { isLoading: isLoadingActivatePlayer, mutateAsync: patchActivatePlayer } = usePatchActivatePlayer(playerId);
  const { isLoading: isLoadingBanPlayer,      mutateAsync: patchBanPlayer }      = usePatchBanPlayer(playerId);
  const { isLoading: isLoadingFreezePlayer,   mutateAsync: patchFreezePlayer }   = usePatchFreezePlayer(playerId);

  const handleConfirmationAction = () => {
    toaster({ content: `Account has been updated` });
    setConfirmationType(null);
  };

  const handleExecuteDestructiveAction = async () => {
    try {
      if (!playerId) {
        throw Error('Player ID missing, please reload the page');
      }

      if (confirmationType === t.EAccountActions.ACTIVATE) {
        await patchActivatePlayer();
      }

      if (confirmationType === t.EAccountActions.BAN) {
        await patchBanPlayer();
      }

      if (confirmationType === t.EAccountActions.FREEZE) {
        const frozenUntilDate = getBeginAndEndDates({ daysFromToday: frozenUntil });

        return confirmAction({
          confirmText: 'Confirm Freeze',
          content: (
            <p>Are you sure you want to freeze this account for <strong>{frozenUntil} day(s)</strong>?</p>
          ),
          title: 'Warning: Irreversible Action',
          onConfirm: async () => {
            await patchFreezePlayer(frozenUntilDate.end);

            return handleConfirmationAction();
          }
        });
      }

      return handleConfirmationAction();
    } catch (error) {
      return handleError(error);
    }
  };

  if (!confirmationType) {
    return null;
  }

  const isLoading = isLoadingActivatePlayer || isLoadingBanPlayer || isLoadingFreezePlayer;

  return (
    <Modal
      onHide={() => setConfirmationType(null)}
      show={!!confirmationType}
      style={{ overflowY: 'initial' }}
      title={`${confirmationType} Account? `}
      width={480}
    >
      <S.ModalContainer>
        {DESCRIPTION_COPY[confirmationType]}

        {(confirmationType === t.EAccountActions.FREEZE) ? (
          <Select
            id="frozenUntil"
            label="Frozen Until"
            value={getOptionFromValue(frozenUntil, c.SELECTION_OPTIONS)}
            options={c.SELECTION_OPTIONS}
            onChange={(option) => setFrozenUntil(option?.value as number)}
          />
        ) : null}

        <Flex gap={16}>
          <Button
            color="secondary"
            disabled={isLoading}
            rightIcon={(isLoading) ? IconLoader : undefined}
            onClick={handleExecuteDestructiveAction}
          >
            Confirm {confirmationType}
          </Button>

          <Button
            color="danger"
            disabled={isLoading}
            onClick={() => setConfirmationType(null)}
          >
            Cancel
          </Button>
        </Flex>
      </S.ModalContainer>
    </Modal>
  );
};

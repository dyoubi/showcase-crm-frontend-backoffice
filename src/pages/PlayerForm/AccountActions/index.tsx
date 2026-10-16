import { useState } from 'react';

import { PlayerStatusEnum, PlayerWithBonuses } from '@/domains/casino/player';

import { useToggle } from '@/hooks';

import { Button } from '@/shared/Button';
import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import {
  IconCircleCheck,
  IconDanger,
  IconEmail,
  IconFlag,
  IconGift,
  IconLock,
  IconShieldLock,
} from '@/shared/Icons';

import { AssignBonusModal } from '../AssignBonusModal';

import { AccountConfirmationModal } from './AccountConfirmationModal';

import { useConfirmEmailSend, useHandleSendEmail } from './hooks';
import * as S from './styles';
import { EAccountActions } from './types';

export type AccountActionsProps = {
  player: PlayerWithBonuses | undefined;
};

export const AccountActions = (props: AccountActionsProps) => {
  const { player } = props;

  const [confirmationType, setConfirmationType] = useState<EAccountActions | null>(null);

  const confirmSendEmail = useConfirmEmailSend();
  const { handleSendPasswordResetEmail, handleSendVerificationEmail } = useHandleSendEmail();
  const [displayBonusModal, toggleBonusModal] = useToggle();

  if (!player) {
    return (
      <Card title="Actions" icon={IconDanger}>
        There are no actions for this user.
      </Card>
    );
  }

  if (PlayerStatusEnum.BANNED === player.status) {
    return null;
  }

  return (
    <>
      <Card title="Actions" icon={IconDanger}>
        <Flex flexDirection="column" gap={18}>
          <Flex flexDirection="column">
            <S.Heading as="h3">
              Account Actions
            </S.Heading>

            <Flex
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="flex-start"
              gap={10}
            >
              {(
                  PlayerStatusEnum.ACTIVATED !== player.status
                  && PlayerStatusEnum.FROZEN !== player.status
              ) ? (
                <Button
                  color="secondary"
                  leftIcon={IconCircleCheck}
                  onClick={() => setConfirmationType(EAccountActions.ACTIVATE)}
                >
                  Activate
                </Button>
              ) : null}

                <Button
                  color="secondary"
                  leftIcon={IconFlag}
                  onClick={() => setConfirmationType(EAccountActions.BAN)}
                >
                  Ban
                </Button>

              {(player.status !== PlayerStatusEnum.FROZEN) ? (
                <Button
                  color="secondary"
                  leftIcon={IconShieldLock}
                  onClick={() => setConfirmationType(EAccountActions.FREEZE)}
                >
                  Freeze
                </Button>
              ) : null}
            </Flex>
          </Flex>

          <Flex flexDirection="column">
            <S.Heading as="h3">
              Player Actions
            </S.Heading>

            <Flex
              justifyContent="flex-start"
              flexDirection="row"
              flexWrap="wrap"
              gap={10}
            >
              <Button
                color="secondary"
                leftIcon={IconGift}
                onClick={() => toggleBonusModal()}
              >
                Assign Bonus
              </Button>

              <Button
                color="secondary"
                leftIcon={IconLock}
                onClick={() => handleSendPasswordResetEmail(player?.email || '')}
              >
                Reset Password
              </Button>

              {(player.status !== PlayerStatusEnum.ACTIVATED) ? (
                <Button
                  color="secondary"
                  leftIcon={IconEmail}
                  onClick={() =>
                    confirmSendEmail({
                      email: player?.email,
                      onConfirm: async () => {
                        await handleSendVerificationEmail(player?.email || '');
                      },
                    })
                  }
                >
                  Send Verification Email
                </Button>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {(displayBonusModal && player) ? (
        <AssignBonusModal
          onHide={toggleBonusModal}
          player={player}
        />
      ) : null}

      {(confirmationType) ? (
        <AccountConfirmationModal
        confirmationType={confirmationType}
        setConfirmationType={setConfirmationType}
        playerId={player.id}
        />
      ) : null}
    </>
  );
};

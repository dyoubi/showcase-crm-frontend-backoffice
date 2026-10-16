import { Sticky } from '@/components/Sticky';
import { ToolTipPriceFiat } from '@/components/ToolTipPriceFiat';
import { useGetOperatorMachine } from '@/domains/casino/machine';
import { Session } from '@/domains/casino/player/balance';
import { CryptoCodes } from '@/domains/currency';
import { useAppDateFormat } from '@/hooks';
import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { IconChevronRight, IconInfoCircle } from '@/shared/Icons';
import { Spacer } from '@/shared/Spacer';
import { Tooltip } from '@/shared/Tooltip';
import * as S from '../styles';

export type LoginSessionDetailsProps = {
  session: Session;
};

export const LoginSessionDetails = ({ session }: LoginSessionDetailsProps) => {
  const { data: machine } = useGetOperatorMachine(session?.machineId);
  const lastBet = session?.actions.at(0);
  const firstBet = session?.actions.at(-1);
  const { formatDate } = useAppDateFormat();

  return (
    <Sticky top={9}>
      <Card icon={IconInfoCircle} title="Details">
        <S.GameInfoLine>
          <S.Title>Game Session ID</S.Title>
          {session.id}
        </S.GameInfoLine>

        <S.GameInfoLine>
          <S.Title>Game</S.Title>
          {machine?.info.title}
        </S.GameInfoLine>

        <S.GameInfoLine>
          <S.Title>Game ID</S.Title>
          {machine?.id}
        </S.GameInfoLine>

        <S.GameInfoLine>
          <S.Title>Game Session Duration</S.Title>
          <Flex flexDirection="row" alignItems="center">
            <Tooltip message="Game session started at">
              {formatDate(firstBet?.createdAt ?? '', { displayFullDate: true })}
            </Tooltip>
            <Spacer size="xxs" />
            <IconChevronRight size="xs" />
            <Spacer size="xxs" />
            <Tooltip message="Game session ended at">
              {formatDate(lastBet?.createdAt ?? '', {
                displayFullDate: true,
              })}
            </Tooltip>
          </Flex>
        </S.GameInfoLine>

        <S.GameInfoLine>
          <S.Title>Provider</S.Title> {machine?.info.provider}
        </S.GameInfoLine>

        <S.GameInfoLine>
          <S.Title>Provider ID</S.Title> {machine?.providerId}
        </S.GameInfoLine>

        <S.GameInfoLine>
          <S.Title>Balance</S.Title>
          <Flex flexDirection="row" alignItems="center">
            <ToolTipPriceFiat
              currency={session.gameAccount.balanceCurrency as CryptoCodes}
              message="Balance Before"
            >
              80999009
            </ToolTipPriceFiat>
            <Spacer size="xxs" />
            <IconChevronRight size="xs" />
            <Spacer size="xxs" />
            <S.EndBalance>
              <ToolTipPriceFiat
                currency={session.gameAccount.balanceCurrency as CryptoCodes}
                message="Balance After"
              >
                180999009
              </ToolTipPriceFiat>
            </S.EndBalance>
          </Flex>
        </S.GameInfoLine>
      </Card>
    </Sticky>
  );
};

import { useEffect } from 'react';
import isNil from 'lodash/isNil';

import { GameThumbnailProps } from '@/shared/GameThumbnail';
import { Button } from '@/shared/Button';
import { Tooltip, useTooltipRef } from '@/shared/Tooltip';
import { IconTrash, IconShuffle } from '@/shared/Icons';
import { Spacer } from '@/shared/Spacer';

import { DATA_TEST_IDS } from '@/constants';

import { ChangePositionForm } from './ChangePositionForm';
import * as S from './styles';
import * as c from './constants';

interface GameThumbnailWithButtonsProps extends GameThumbnailProps {
  onSwapPositionIndex?: (newPositionIndex: number) => void;
  onRemove?: () => void;
  isGrabbing?: boolean;
  position?: number;
}

export const GameThumbnailWithButtons = ({
  onRemove,
  onSwapPositionIndex,
  isGrabbing,
  position,
  ...rest
}: GameThumbnailWithButtonsProps) => {
  const tooltipRef = useTooltipRef();

  useEffect(() => {
    const hide = tooltipRef.current?.hide;
    return () => {
      hide?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.GameThumbnail {...rest} ref={null} isGrabbing={isGrabbing}>
      {!isNil(position) && <S.PositionContainer>{position}</S.PositionContainer>}
      <S.ToolbarContainer className={c.CLASSNAMES.TOOLBAR_CONTAINER}>
        {onSwapPositionIndex && (
          <>
            <Tooltip
              displayOn="click"
              message={<ChangePositionForm onSwapPositionIndex={onSwapPositionIndex} />}
            >
              <Button
                type="button"
                color="primary"
                data-testid={DATA_TEST_IDS.CHANGE_GAME_POSITION_BUTTON}
              >
                <IconShuffle size="m" />
              </Button>
            </Tooltip>
            <Spacer size="xxs" />
          </>
        )}
        {onRemove && (
          <Button onClick={onRemove} type="button" color="danger">
            <IconTrash size="m" />
          </Button>
        )}
      </S.ToolbarContainer>
    </S.GameThumbnail>
  );
};

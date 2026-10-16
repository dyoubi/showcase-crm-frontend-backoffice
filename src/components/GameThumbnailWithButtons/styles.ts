import styled from '@emotion/styled';
import { GameThumbnail as GameThumbnailRaw } from '@/shared/GameThumbnail';
import { Flex } from '@/shared/Flex';

import * as c from './constants';

export const GameThumbnail = styled(GameThumbnailRaw)<{ isGrabbing?: boolean }>(
  ({ isGrabbing }) => ({
    cursor: isGrabbing ? 'grab' : undefined,
    [`.${c.CLASSNAMES.TOOLBAR_CONTAINER}`]: {
      opacity: 0,
    },
    [`&:hover .${c.CLASSNAMES.TOOLBAR_CONTAINER}`]: {
      opacity: 1,
    },
  }),
);

export const ToolbarContainer = styled.div({
  position: 'absolute',
  top: 8,
  right: 8,
  transition: 'opacity 350ms ease-in-out',
});

export const PositionContainer = styled(Flex)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  height: 40,
  width: 40,
  backgroundColor: theme.colors.tertiary.main,
}));

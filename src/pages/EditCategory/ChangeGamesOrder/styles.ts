import styled from '@emotion/styled';

import * as c from './constants';

export const WrapperDragNDrop = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  [`.${c.CLASSNAMES.GAME_THUMBNAIL} ~ .${c.CLASSNAMES.GAME_THUMBNAIL}`]: {
    marginLeft: theme.spaces.margin.xs,
  },
}));

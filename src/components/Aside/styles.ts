import styled from '@emotion/styled';

import * as t from './types';

export const Container = styled.aside<t.AsideProps>(({
  fullHeight,
  fullWidth,
  sticky,
  width,
}) => ({
  boxSizing: 'border-box',
  maxHeight: (fullHeight) ? '100%' : 'inherit',
  maxWidth: (fullWidth) ? '100%' : 'inherit',
  minWidth: (width) ? `${width}px` : 'auto',

  '& > *': {
    top: (sticky) ? 0 : undefined,
    position: (sticky) ? 'sticky' : 'inherit',
    width: '100%',
  },

   '& > div div *:last-child': {
    margin: 0,
  }
}));

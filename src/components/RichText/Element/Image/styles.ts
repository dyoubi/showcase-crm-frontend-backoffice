import styled from '@emotion/styled';
import { AlignType } from 'slate';

import { Flex } from '@/shared/Flex';

export const Container = styled.div({
  position: 'relative',
});

const alignCSS = {
  center: 'center',
  right: 'right',
  left: undefined,
  justify: undefined,
} as const;

export const ImageContainer = styled(Flex)<{ align?: AlignType }>(({ align = 'left' }) => ({
  justifyContent: alignCSS?.[align],
}));

export const Img = styled.img<{ selected?: boolean; focused?: boolean }>(
  ({ selected, focused }) => ({
    display: 'block',
    maxWidth: '100%',
    maxHeight: '20em',
    boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
  }),
);

export const ButtonsContainer = styled(Flex)({
  position: 'absolute',
  top: '0.5rem',
  left: '0.5rem',
});

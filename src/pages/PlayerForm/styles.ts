import styled from '@emotion/styled';

import { Flex } from '@/shared/Flex';

export const Container = styled(Flex)(({ theme }) => ({
  gap: theme.spaces.padding.s,
  marginBottom: theme.spaces.padding.xs,

  '& > div': {
    position: 'sticky',
  },

  '& > div:first-of-type': {
    width: '100%',
  },

  '& > div:nth-of-type(2)': {
    alignSelf: 'flex-start',
  },

  '& > div > *:last-child': {
    marginBottom: 0,
  },
}));

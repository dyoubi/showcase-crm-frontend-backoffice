import styled from '@emotion/styled';

import { Flex } from '../Flex';

export const Container = styled(Flex)(({ theme }) => ({
  color: theme.colors.secondary.main,
  padding: `${theme.spaces.margin.xxs} 0px`,
}));

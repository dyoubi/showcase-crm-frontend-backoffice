import styled from '@emotion/styled';

import { Flex } from '@/shared/Flex';

export const Container = styled(Flex)(({ theme }) => ({
  backgroundColor: theme.colors.tertiary.main,
  height: '100%',
}));

import styled from '@emotion/styled';
import { Flex } from '@/shared/Flex';

const color = 220;

export const Container = styled(Flex)<{ isActive?: boolean }>({
  border: '1px solid #aaa',
  backgroundColor: `rgb(${color}, ${color}, ${color})`,
});

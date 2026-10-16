import styled from '@emotion/styled';
import { convertHexColorToRgba } from '@/utils/color';
import { Flex } from '../Flex';

export const LoadingOverlay = styled(Flex)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: convertHexColorToRgba(theme.colors.tertiary.main, 0.88),
  zIndex: 1,
}));

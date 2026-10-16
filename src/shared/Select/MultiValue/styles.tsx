import styled from '@emotion/styled';

import { Flex } from '../../Flex';

export const Container = styled(Flex)<{ color?: string }>(({ theme, color }) => ({
  minWidth: 0,
  alignItems: 'center',
  backgroundColor: `${color || theme.colors.primary.main}`,
  color: 'white',
  fontWeight: 'bold',
  padding: '4px 8px',
  borderRadius: 4,
  marginRight: 6,
  marginBottom: 1,
  marginTop: 1,
}));

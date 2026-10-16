import styled from '@emotion/styled';
import { Select as SelectRaw } from '@/shared/Select';

export const Container = styled.div({ width: '100%' });

export const SelectsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

export const Select = styled(SelectRaw)({
  flex: 1,
});

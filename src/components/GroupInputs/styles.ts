import styled from '@emotion/styled';

export const Container = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'row',
  gap: 16,

  '& > *': {
    flex: 1,
  },
});

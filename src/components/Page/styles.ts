import styled from '@emotion/styled';

export const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  maxWidth: 1190,
  margin: '0 auto',
  position: 'relative',
  padding: theme.spaces.padding.l,
  paddingTop: theme.spaces.padding.xxs,
  paddingBottom: 350,
}));

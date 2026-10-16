import styled from '@emotion/styled';

export const Container = styled.div(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spaces.margin.l,
}));

export const PlayerAddress = styled.pre({
  margin: 0,
  maxWidth: '120px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const DataContainer = styled.div<{justifyContent?: 'flex-start' | 'center' | 'flex-end'}>(({ theme, justifyContent }) => ({
  display: 'inline-flex',
  justifyContent: justifyContent || 'center',
  alignItems: 'center',
  gap: theme.spaces.padding.xxs,
  width: '100%',
}));

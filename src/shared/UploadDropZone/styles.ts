import styled from '@emotion/styled';

export const Container = styled.section({
  width: 470,
  svg: {
    transform: 'scale(1.40)'
  }
});

export const Content = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  cursor: 'pointer',
  boxSizing: 'border-box',
  borderRadius:7,
  border: `3px dashed ${theme.colors.secondary.main}`,
  '&:hover .logo': {
    transform: 'scale(1.45)',
  },
}));

export const TitleContainer = styled.div();

// TODO @HEADING: Standardize Heading component
export const Title = styled.div(({ theme }) => ({
  color: theme.colors.primary.main,
  fontWeight: theme.typography.heading.h2.fontWeight,
  marginTop: theme.spaces.margin.m,
  fontSize: 28,
}));

export const FilesList = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: theme.spaces.padding.m,
}));

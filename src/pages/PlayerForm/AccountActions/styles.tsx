import styled from '@emotion/styled';

// TODO @HEADING: Standardize Heading component
export const Heading = styled.h3(({ theme }) => ({
  marginTop: 0,
  marginBottom: theme.spaces.margin.s,
}));

export const ModalContainer = styled.div(({ theme }) => ({
  '.react-datepicker-wrapper': {
    marginBottom: theme.spaces.margin.m,
  },

  '& > p, & > p + div:has(label)': {
    margin: 0,
    marginBottom: theme.spaces.margin.m,
  }
}));

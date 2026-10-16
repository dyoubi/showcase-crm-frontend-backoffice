import styled from '@emotion/styled';

export const Container = styled.div({
  width: '100%',
});

export const ListContainer = styled.ul(({ theme }) => ({
  listStyleType: 'none',
  borderLeft: `2px solid ${theme.colors.secondary.main}`,
  padding: '10px 5px',
}));

export const Timeline = styled.li(({ theme }) => ({
  paddingTop: 20,
  paddingLeft: 10,
  position: 'relative',
  cursor: 'pointer',
  transition: '0.5s',
  '&:hover:before': {
    backgroundColor: theme.colors.success.main,
    boxShadow: `0px 0px 10px 2px ${theme.colors.success.main}`,
  },
  '&:before': {
    position: 'absolute',
    content: '""',
    width: 10,
    height: 10,
    backgroundColor: theme.colors.primary.main,
    borderRadius: '50%',
    left: -11,
    top: 28,
    transition: '0.5s',
  },
}));

export const Date = styled.span(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.colors.primary.main,
  color: theme.colors.primary.contrastText,
  borderRadius: 25,
  padding: '2px 9px',
  fontSize: 12,
  textAlign: 'center',
}));

// TODO @HEADING: Standardize Heading component
export const Title = styled.h3(({ theme }) => ({
  color: theme.colors.primary.main,
  fontSize: 15,
  padding: 0,
  margin: `${theme.spaces.margin.xxs} 0`,
}));

export const Content = styled.div({
  margin: 0,
  padding: '8px 0px 15px 0px',
  fontSize: 12,
});

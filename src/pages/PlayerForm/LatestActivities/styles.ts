import styled from '@emotion/styled';

export const StyledDateRangePicker = styled.div(({ theme }) => ({
  'input': {
      paddingRight: 40,
  },

  '.react-datepicker__close-icon': {
    padding: '24px 15px 0px 0px',

    '&::after': {
      backgroundColor: theme.colors.primary.main,
    }
  },
}));

import styled from '@emotion/styled';
import Tippy from '@tippyjs/react';

export const Tooltip = styled(Tippy)(({ theme }) => ({
  backgroundColor: theme.colors?.tertiary.main,
  color: theme.colors.primary.contrastText,
  padding: `${theme.spaces.padding.xxs} ${theme.spaces.padding.m}`,
  boxShadow: '0 4px 20px 1px rgb(0 0 0 / 6%), 0 1px 4px rgb(0 0 0 / 8%)',
  borderRadius: 6,
}));

export const Content = styled.div({
  display: 'inline-block',
});

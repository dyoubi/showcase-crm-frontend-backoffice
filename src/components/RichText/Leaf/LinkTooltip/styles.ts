import styled from '@emotion/styled';

import { IconExternalLink, IconTrash } from '@/shared/Icons';

export const Link = styled.span(({ theme }) => ({
  textDecoration: 'underline',
  color: theme.colors.primary.main,
}));

export const OpenLink = styled(IconExternalLink)({
  cursor: 'pointer',
});

export const Trash = styled(IconTrash)({
  cursor: 'pointer',
});

import styled from '@emotion/styled';

import { IconInfoCircle, IconTrash } from '@/shared/Icons';

export const InfoIcon = styled(IconInfoCircle)({
  position: 'absolute',
  top: -14,
  right: -18,
});

export const Trash = styled(IconTrash)({
  cursor: 'pointer',
});

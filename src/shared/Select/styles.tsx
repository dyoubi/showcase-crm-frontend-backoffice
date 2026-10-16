import styled from '@emotion/styled';

import { IconChevronDown as ChevronDownRaw } from '../Icons';

export const ChevronDown = styled(ChevronDownRaw)(({ theme }) => ({
  marginRight: theme.spaces.margin.s,
}));

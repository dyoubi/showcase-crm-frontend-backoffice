import styled from '@emotion/styled';

import { Input, CLASSNAMES } from '../Input';
import { Flex } from '../Flex';

import * as c from './constants';

export const Container = styled(Flex)<{ isEditMode: boolean }>(({ theme }) => ({
  [`.${c.CLASSNAMES.EDIT_ICON}, .${c.CLASSNAMES.EDIT_TEXT}`]: {
    cursor: 'pointer',
  },
  [`.${c.CLASSNAMES.EDIT_TEXT}`]: {
    opacity: 0,
  },
  [`&:hover .${c.CLASSNAMES.EDIT_TEXT}, &:hover .${c.CLASSNAMES.EDIT_ICON}`]: {
    opacity: 1,
    color: theme.colors.primary.main,
  },
}));

export const ValueText = styled.span({ fontSize: 25, fontWeight: 'bold' });

export const EditableInput = styled(Input)({
  [`.${CLASSNAMES.INPUT}`]: {
    fontWeight: 'bold',
    fontSize: 23,
  },
});

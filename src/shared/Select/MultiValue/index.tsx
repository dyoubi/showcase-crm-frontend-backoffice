import React from 'react';
import { GroupBase, MultiValueProps } from 'react-select';

import * as S from './styles';
import { IconClose } from '../../Icons';
import { Spacer } from '../../Spacer';
import * as t from '../types';
import { Flex } from '../../Flex';

export const MultiValue = <
  Option extends t.OptionType & { color?: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: MultiValueProps<Option, IsMulti, Group>,
) => {
  return (
    <S.Container color={props?.data?.color} display="flex">
      {props?.children}
      <Spacer size="xxs" />
      <Flex alignItems="center" justifyContent="center" onClick={props?.removeProps?.onClick}>
        <IconClose color="currentColor" size={18} />
      </Flex>
    </S.Container>
  );
};

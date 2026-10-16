import { useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
import { Text } from 'slate';

import { Tooltip, useTooltipRef } from '@/shared/Tooltip';
import { Input } from '@/shared/Input';
import { Button } from '@/shared/Button';
import { IconEdit } from '@/shared/Icons';

import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { useToggle } from '../../../../hooks';
import { useEditFocusedNode } from '../../hooks';
import * as S from './styles';

interface TooltipTextProps {
  leaf: Text;
  children?: string;
}

export const MarkTooltip = ({ leaf, children }: TooltipTextProps) => {
  const editor = useSlate();
  const [displayInput, toggleDisplayInput] = useToggle();
  const [value, setValue] = useState('');
  const tooltipRef = useTooltipRef();

  const { selection } = editor;
  const blockIndex = selection?.focus?.path?.[0] || -1;
  const markIndex = selection?.focus?.path?.[1] || -1;
  const editNode = useEditFocusedNode();

  useEffect(() => {
    setValue(leaf?.tooltip || '');
  }, [blockIndex, markIndex, leaf?.tooltip]);

  const tooltipContent = displayInput ? (
    <Flex flexDirection="row">
      <Input
        autoFocus
        label="Edit tooltip"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        buttonContent="Save"
        buttonProps={{
          onClick: () => editNode({ ...leaf, tooltip: value }),
        }}
      />
      <Spacer size="xxs" />
      <Flex flexDirection="column" justifyContent="flex-end">
        <Button type="button" color="danger" onClick={toggleDisplayInput}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  ) : (
    <Flex flexDirection="row" alignItems="center">
      <span>{leaf?.tooltip}</span>
      <Spacer size="xs" />
      <IconEdit color="white" size="m" onClick={toggleDisplayInput} />
      <Spacer size="xs" />
      <S.Trash color="danger" size="m" onClick={() => editNode({ ...leaf, tooltip: undefined })} />
    </Flex>
  );

  return (
    <Tooltip
      ref={tooltipRef}
      message={tooltipContent}
      displayOn="click"
      placement="top"
      hideOnClick
    >
      <span style={{ position: 'relative' }}>
        <span>{children}</span>
        <S.InfoIcon size="m" />
      </span>
    </Tooltip>
  );
};

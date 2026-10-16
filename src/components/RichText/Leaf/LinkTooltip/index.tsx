import { useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
import { Text } from 'slate';

import { ellipsisMiddle, openUrlNewWindow } from '@/utils';
import { Tooltip } from '@/shared/Tooltip';
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

export const LinkTooltip = ({ leaf, children }: TooltipTextProps) => {
  const editor = useSlate();
  const [displayInput, toggleDisplayInput] = useToggle();
  const [value, setValue] = useState('');

  const { selection } = editor;
  const blockIndex = selection?.focus?.path?.[0] || -1;
  const markIndex = selection?.focus?.path?.[1] || -1;
  const editNode = useEditFocusedNode();

  useEffect(() => {
    setValue(leaf?.link || '');
  }, [blockIndex, markIndex, leaf?.link]);

  const tooltipContent = displayInput ? (
    <Flex flexDirection="row">
      <Input
        autoFocus
        label="Edit url"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        buttonContent="Save"
        buttonProps={{
          onClick: () => editNode({ ...leaf, link: value }),
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
      <span>{ellipsisMiddle(leaf?.link)}</span>
      <Spacer size="xs" />
      <IconEdit color="white" size="m" onClick={toggleDisplayInput} />
      <Spacer size="xs" />
      <S.OpenLink
        color="white"
        size="m"
        onClick={() => (leaf?.link ? openUrlNewWindow(leaf?.link) : '')}
      />
      <Spacer size="xs" />
      <S.Trash color="danger" size="m" onClick={() => editNode({ ...leaf, link: undefined })} />
    </Flex>
  );

  return (
    <Tooltip message={tooltipContent} displayOn="click" placement="bottom" hideOnClick>
      <S.Link>
        <span>{children}</span>
      </S.Link>
    </Tooltip>
  );
};
